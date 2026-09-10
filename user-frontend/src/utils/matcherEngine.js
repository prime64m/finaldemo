// Rule-based Scheme Eligibility Engine

import { SCHEMES } from "../data/schemesData";

export function evaluateEligibility(familyProfile) {
  if (!familyProfile || !familyProfile.members || familyProfile.members.length === 0) {
    return {
      eligibleSchemes: [],
      checkDetailsSchemes: [],
      notEligibleSchemes: []
    };
  }

  const { familyDetails, members } = familyProfile;
  const totalFamilyIncome = members.reduce((sum, m) => sum + (Number(m.annualIncome) || 0), 0);

  const eligibleSchemes = [];
  const checkDetailsSchemes = [];
  const notEligibleSchemes = [];

  SCHEMES.forEach((scheme) => {
    const rules = scheme.eligibilityRules;
    const qualifyingMembers = [];
    let bestMatchScore = 0;
    let bestMemberReasons = [];
    let bestMemberFailures = [];

    members.forEach((member) => {
      const matchReasons = [];
      const failReasons = [];
      let totalCriteriaCount = 0;
      let passedCriteriaCount = 0;

      // 1. Age Check
      totalCriteriaCount++;
      const ageNum = Number(member.age) || 0;
      if (ageNum >= rules.minAge && ageNum <= rules.maxAge) {
        passedCriteriaCount++;
        matchReasons.push(`Age requirement satisfied (${ageNum} yrs is within ${rules.minAge}–${rules.maxAge} range)`);
      } else {
        failReasons.push(`Age requirement failed (${ageNum} yrs is outside ${rules.minAge}–${rules.maxAge} range)`);
      }

      // 2. Gender Check
      if (rules.genderRequirement !== "ANY") {
        totalCriteriaCount++;
        if (member.gender === rules.genderRequirement) {
          passedCriteriaCount++;
          matchReasons.push(`Gender requirement satisfied (${member.gender})`);
        } else {
          failReasons.push(`Gender requirement failed (Requires ${rules.genderRequirement}, member is ${member.gender})`);
        }
      }

      // 3. State Check
      totalCriteriaCount++;
      const isAllIndia = rules.states.includes("All India");
      const isStateMatched = isAllIndia || rules.states.includes(familyDetails?.state);
      if (isStateMatched) {
        passedCriteriaCount++;
        matchReasons.push(`State requirement satisfied (${familyDetails?.state || "All India"})`);
      } else {
        failReasons.push(`State requirement failed (Applicable in ${rules.states.join(", ")}, family state is ${familyDetails?.state})`);
      }

      // 4. Occupation Check
      totalCriteriaCount++;
      const isAnyOcc = rules.occupations.includes("ANY");
      const isOccMatched = isAnyOcc || rules.occupations.includes(member.occupation);
      if (isOccMatched) {
        passedCriteriaCount++;
        matchReasons.push(`Occupation requirement satisfied (${member.occupation})`);
      } else {
        failReasons.push(`Occupation requirement failed (Requires ${rules.occupations.join(", ")})`);
      }

      // 5. Income Check (Member or Total Family)
      totalCriteriaCount++;
      const memberIncome = Number(member.annualIncome) || 0;
      const isIncomeOk = memberIncome <= rules.maxAnnualIncome || totalFamilyIncome <= rules.maxAnnualIncome;
      if (isIncomeOk) {
        passedCriteriaCount++;
        matchReasons.push(`Income requirement satisfied (₹${memberIncome.toLocaleString('en-IN')} is below ₹${rules.maxAnnualIncome.toLocaleString('en-IN')} limit)`);
      } else {
        failReasons.push(`Income requirement failed (Income ₹${memberIncome.toLocaleString('en-IN')} exceeds ₹${rules.maxAnnualIncome.toLocaleString('en-IN')} max limit)`);
      }

      // 6. Social Category Check
      totalCriteriaCount++;
      const isAnyCat = rules.socialCategories.includes("ANY");
      const isCatMatched = isAnyCat || rules.socialCategories.includes(member.socialCategory);
      if (isCatMatched) {
        passedCriteriaCount++;
        matchReasons.push(`Social Category requirement satisfied (${member.socialCategory})`);
      } else {
        failReasons.push(`Social Category failed (Requires ${rules.socialCategories.join(", ")})`);
      }

      // 7. Disability Check
      if (rules.disabilityRequirement === "REQUIRED") {
        totalCriteriaCount++;
        const hasPwd = member.disability && member.disability !== "No Disability";
        if (hasPwd) {
          passedCriteriaCount++;
          matchReasons.push(`Disability criteria satisfied (${member.disability})`);
        } else {
          failReasons.push(`Disability criteria required (Member has No Disability)`);
        }
      }

      // 8. Land Ownership Check
      totalCriteriaCount++;
      const isAnyLand = rules.landOwnership.includes("ANY");
      const isLandMatched = isAnyLand || rules.landOwnership.includes(member.landOwnership);
      if (isLandMatched) {
        passedCriteriaCount++;
        matchReasons.push(`Land ownership criteria satisfied (${member.landOwnership})`);
      } else {
        failReasons.push(`Land ownership criteria failed (Requires ${rules.landOwnership.join(", ")})`);
      }

      // 9. Ration Card Check
      totalCriteriaCount++;
      const isAnyRation = rules.rationCardRequirement.includes("ANY");
      const isRationMatched = isAnyRation || rules.rationCardRequirement.includes(familyDetails?.rationCard);
      if (isRationMatched) {
        passedCriteriaCount++;
        matchReasons.push(`Ration card criteria satisfied (${familyDetails?.rationCard || "Any Card"})`);
      } else {
        failReasons.push(`Ration card requirement failed (Requires ${rules.rationCardRequirement.join(", ")})`);
      }

      // 10. Special Attributes Check
      if (rules.specialAttributes && rules.specialAttributes.length > 0) {
        rules.specialAttributes.forEach(attr => {
          totalCriteriaCount++;
          const hasAttr = member.specialAttributes && member.specialAttributes.includes(attr);
          if (hasAttr) {
            passedCriteriaCount++;
            matchReasons.push(`Special status satisfied (${attr})`);
          } else {
            failReasons.push(`Special status missing (${attr})`);
          }
        });
      }

      const matchRatio = totalCriteriaCount > 0 ? passedCriteriaCount / totalCriteriaCount : 0;

      if (matchRatio === 1.0) {
        qualifyingMembers.push({
          member,
          matchReasons,
          matchRatio
        });
      }

      if (matchRatio > bestMatchScore) {
        bestMatchScore = matchRatio;
        bestMemberReasons = matchReasons;
        bestMemberFailures = failReasons;
      }
    });

    const evaluatedResult = {
      scheme,
      qualifyingMembers,
      bestMatchScore,
      bestMemberReasons,
      bestMemberFailures
    };

    if (qualifyingMembers.length > 0) {
      eligibleSchemes.push(evaluatedResult);
    } else if (bestMatchScore >= 0.65) {
      checkDetailsSchemes.push(evaluatedResult);
    } else {
      notEligibleSchemes.push(evaluatedResult);
    }
  });

  return {
    eligibleSchemes,
    checkDetailsSchemes,
    notEligibleSchemes
  };
}
