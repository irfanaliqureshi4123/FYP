/**
 * Form Validation Rules for Register College
 */

export const validationRules = {
  collegeName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s&'-]+$/,
    messages: {
      required: "College name is required",
      minLength: "College name must be at least 2 characters",
      maxLength: "College name must be less than 100 characters",
      pattern: "College name can only contain letters, numbers, spaces, &, ', and -"
    }
  },

  description: {
    required: true,
    minLength: 20,
    maxLength: 500,
    messages: {
      required: "College description is required",
      minLength: "Description must be at least 20 characters",
      maxLength: "Description must be less than 500 characters"
    }
  },

  location: {
    required: true,
    minLength: 5,
    maxLength: 200,
    messages: {
      required: "College location is required",
      minLength: "Location must be at least 5 characters",
      maxLength: "Location must be less than 200 characters"
    }
  },

  type: {
    required: true,
    enum: ['Public', 'Private', 'NGO'],
    messages: {
      required: "College type is required",
      enum: "Please select a valid college type"
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
      required: "Principal/Director name is required",
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
    min: 50,
    max: 50000,
    messages: {
      required: "Total students count is required",
      min: "College must have at least 50 students",
      max: "Maximum students count is 50000"
    }
  },

  totalTeachers: {
    required: true,
    min: 5,
    max: 5000,
    messages: {
      required: "Total faculty count is required",
      min: "College must have at least 5 faculty members",
      max: "Maximum faculty count is 5000"
    }
  },

  motto: {
    required: false,
    maxLength: 200,
    messages: {
      maxLength: "Motto must be less than 200 characters"
    }
  },

  accreditation: {
    required: false,
    maxLength: 200,
    messages: {
      maxLength: "Accreditation info must be less than 200 characters"
    }
  }
};

export const getInitialFormState = () => ({
  collegeName: '',
  description: '',
  location: '',
  type: '',
  foundedYear: new Date().getFullYear() - 10,
  principalName: '',
  phone: '',
  email: '',
  website: '',
  totalStudents: '',
  totalTeachers: '',
  motto: '',
  accreditation: '',
  primaryColor: '#7C3AED',
  secondaryColor: '#5B21B6',
  logo: null,
  banner: null,
  logoPreview: null,
  bannerPreview: null
});

export const validateForm = (formData) => {
  const errors = {};

  Object.keys(validationRules).forEach(field => {
    const rule = validationRules[field];
    const value = formData[field];

    // Check required
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = rule.messages.required;
      return;
    }

    // Skip validation for empty optional fields
    if (!rule.required && (!value || value.toString().trim() === '')) {
      return;
    }

    // Check minLength
    if (rule.minLength && value.toString().length < rule.minLength) {
      errors[field] = rule.messages.minLength;
      return;
    }

    // Check maxLength
    if (rule.maxLength && value.toString().length > rule.maxLength) {
      errors[field] = rule.messages.maxLength;
      return;
    }

    // Check min (for numbers)
    if (rule.min !== undefined && parseInt(value) < rule.min) {
      errors[field] = rule.messages.min;
      return;
    }

    // Check max (for numbers)
    if (rule.max !== undefined && parseInt(value) > rule.max) {
      errors[field] = rule.messages.max;
      return;
    }

    // Check pattern
    if (rule.pattern && !rule.pattern.test(value.toString())) {
      errors[field] = rule.messages.pattern;
      return;
    }

    // Check enum
    if (rule.enum && !rule.enum.includes(value)) {
      errors[field] = rule.messages.enum;
      return;
    }
  });

  return errors;
};
