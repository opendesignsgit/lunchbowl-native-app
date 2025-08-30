export type ValidationErrors = {[field: string]: string};

export const validateParentDetails = (data: {
  fatherFullName: string;
  motherFullName: string;
  mobileNumber: string;
  address: string;
  email?: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.fatherFullName.trim()) {
    errors.fatherFullName = 'Father’s full name is required.';
  }

  if (!data.motherFullName.trim()) {
    errors.motherFullName = 'Mother’s full name is required.';
  }

  if (!data.mobileNumber.trim()) {
    errors.mobileNumber = 'Mobile number is required.';
  } else if (!/^\d+$/.test(data.mobileNumber)) {
    errors.mobileNumber = 'Mobile number must contain only digits.';
  } else if (data.mobileNumber.length < 10) {
    errors.mobileNumber = 'Mobile number must be at least 10 digits.';
  } else if (data.mobileNumber.length > 12) {
    errors.mobileNumber = 'Mobile number cannot exceed 12 digits.';
  }

  if (!data.address.trim()) {
    errors.address = 'Address is required.';
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
};

export const validateChildrenDetails = (
  children: {
    childName: string;
    dob: string;
    school: string;
    location: string;
    lunchTime: string;
  }[],
): ValidationErrors => {
  const errors: ValidationErrors = {};

  children.forEach((child, idx) => {
    if (!child.childName.trim()) {
      errors[`childName_${idx}`] = 'Child name is required.';
    }
    if (!child.dob.trim()) {
      errors[`dob_${idx}`] = 'Date of Birth is required.';
    }
    if (!child.school.trim()) {
      errors[`school_${idx}`] = 'School is required.';
    }
    if (!child.location.trim()) {
      errors[`location_${idx}`] = 'Location is required.';
    }
    if (!child.lunchTime.trim()) {
      errors[`lunchTime_${idx}`] = 'Lunch Time is required.';
    }
  });

  return errors;
};
