/**
 * Form Validation Rules for Register School
 */

export const validationRules = {
  schoolName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s&'-]+$/,
    messages: {
      required: "School name is required",
      minLength: "School name must be at least 2 characters",
      maxLength: "School name must be less than 100 characters",
      pattern: "School name can only contain letters, numbers, spaces, &, ', and -"
    }
  },

  description: {
    required: true,
    minLength: 20,
    maxLength: 500,
    messages: {
      required: "School description is required",
      minLength: "Description must be at least 20 characters",
      maxLength: "Description must be less than 500 characters"
    }
  },

  location: {
    required: true,
    minLength: 5,
    maxLength: 200,
    messages: {
      required: "School location is required",
      minLength: "Location must be at least 5 characters",
      maxLength: "Location must be less than 200 characters"
    }
  },

  type: {
    required: true,
    enum: ['Public', 'Private', 'NGO'],
    messages: {
      required: "School type is required",
      enum: "Please select a valid school type"
    }
  },

  foundedYear: {
    required: true,
    min: 1800,
    max: new Date().getFullYear(),
    messages: {
      required: "Founded year is required",
      min: "Founded year must be 1800 or later",
      max: `Founded year cannot be in the future`
    }
  },

  principalName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s.'-]+$/,
    messages: {
      required: "Principal name is required",
      minLength: "Name must be at least 2 characters",
      maxLength: "Name must be less than 100 characters",
      pattern: "Name can only contain letters, spaces, periods, apostrophes, and hyphens"
    }
  },

  phone: {
    required: true,
    pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    messages: {
      required: "Phone number is required",
      pattern: "Please enter a valid phone number"
    }
  },

  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: "Email address is required",
      pattern: "Please enter a valid email address"
    }
  },

  website: {
    required: false,
    pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    messages: {
      pattern: "Please enter a valid website URL (e.g., https://example.com)"
    }
  },

  totalStudents: {
    required: true,
    min: 1,
    max: 10000,
    messages: {
      required: "Total students count is required",
      min: "At least 1 student required",
      max: "Maximum 10,000 students"
    }
  },

  totalTeachers: {
    required: true,
    min: 1,
    max: 1000,
    messages: {
      required: "Total teachers count is required",
      min: "At least 1 teacher required",
      max: "Maximum 1,000 teachers"
    }
  },

  accreditation: {
    required: true,
    minLength: 3,
    maxLength: 100,
    messages: {
      required: "Accreditation is required",
      minLength: "Accreditation must be at least 3 characters",
      maxLength: "Accreditation must be less than 100 characters"
    }
  },

  motto: {
    required: true,
    minLength: 5,
    maxLength: 200,
    messages: {
      required: "School motto is required",
      minLength: "Motto must be at least 5 characters",
      maxLength: "Motto must be less than 200 characters"
    }
  },

  logo: {
    required: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    messages: {
      maxSize: "Logo image must be less than 5MB",
      acceptedTypes: "Logo must be a valid image file (JPEG, PNG, GIF, WebP)"
    }
  },

  banner: {
    required: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    messages: {
      maxSize: "Banner image must be less than 5MB",
      acceptedTypes: "Banner must be a valid image file (JPEG, PNG, GIF, WebP)"
    }
  }
};

/**
 * Validate individual field
 */
export const validateField = (fieldName, value) => {
  const rules = validationRules[fieldName];
  if (!rules) return null;

  // Required field validation
  if (rules.required && (!value || value.toString().trim() === '')) {
    return rules.messages.required;
  }

  // Skip other validations if field is not required and empty
  if (!rules.required && (!value || value.toString().trim() === '')) {
    return null;
  }

  // String length validations
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return rules.messages.minLength;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.messages.maxLength;
    }
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.messages.pattern;
  }

  // Enum validation
  if (rules.enum && !rules.enum.includes(value)) {
    return rules.messages.enum;
  }

  // Number validations
  if (typeof value === 'number') {
    if (rules.min !== undefined && value < rules.min) {
      return rules.messages.min;
    }
    if (rules.max !== undefined && value > rules.max) {
      return rules.messages.max;
    }
  }

  return null;
};

/**
 * Validate file upload
 */
export const validateFile = (fieldName, file) => {
  if (!file) return null;

  const rules = validationRules[fieldName];
  if (!rules) return null;

  // Size validation
  if (rules.maxSize && file.size > rules.maxSize) {
    return rules.messages.maxSize;
  }

  // Type validation
  if (rules.acceptedTypes && !rules.acceptedTypes.includes(file.type)) {
    return rules.messages.acceptedTypes;
  }

  return null;
};

/**
 * Validate entire form
 */
export const validateForm = (formData) => {
  const errors = {};

  Object.keys(validationRules).forEach((fieldName) => {
    const error = validateField(fieldName, formData[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

/**
 * Generate initial form state
 */
export const getInitialFormState = () => ({
  schoolName: '',
  description: '',
  location: '',
  type: 'Private',
  foundedYear: new Date().getFullYear() - 10,
  principalName: '',
  phone: '',
  email: '',
  website: '',
  totalStudents: 100,
  totalTeachers: 10,
  accreditation: '',
  motto: '',
  logo: null,
  banner: null,
  logoPreview: null,
  bannerPreview: null,
  primaryColor: '#10B981',
  secondaryColor: '#059669'
});

/**
 * School types
 */
export const schoolTypes = ['Public', 'Private', 'NGO'];

/**
 * Color presets
 */
export const colorPresets = [
  { name: 'Green', primary: '#10B981', secondary: '#059669' },
  { name: 'Blue', primary: '#3B82F6', secondary: '#1D4ED8' },
  { name: 'Purple', primary: '#8B5CF6', secondary: '#6D28D9' },
  { name: 'Red', primary: '#EF4444', secondary: '#DC2626' },
  { name: 'Orange', primary: '#F97316', secondary: '#EA580C' },
  { name: 'Pink', primary: '#EC4899', secondary: '#BE185D' },
];
