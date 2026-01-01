# RegisterSchool Feature - Integration Guide

## Overview
The RegisterSchool feature allows users to register new schools through a modal form in the School component. This guide documents the complete integration and usage.

## Files Created

### 1. **RegisterSchool.jsx** (Main Modal Component)
- **Location**: `register-school/RegisterSchool.jsx`
- **Purpose**: Main modal wrapper for the registration form
- **Key Features**:
  - Modal overlay with backdrop
  - Form state management
  - File upload handling with preview
  - Form validation
  - Success/error messaging
  - Responsive design for mobile/tablet/desktop

**Props**:
- `isOpen` (boolean): Controls modal visibility
- `onClose` (function): Callback when modal closes
- `onRegister` (function): Callback with new school data when registration succeeds

**State**:
- `formData`: Form input values
- `errors`: Validation error messages
- `isSubmitting`: Loading state during submission
- `submitMessage`: Success/error message display

**Key Methods**:
- `handleInputChange()`: Updates form field values
- `handleFileChange()`: Handles logo/banner file uploads with preview
- `handleColorChange()`: Updates selected school colors
- `handleRemoveFile()`: Removes uploaded files
- `handleSubmit()`: Validates and submits form
- `handleClose()`: Closes modal and resets state

### 2. **RegisterSchoolForm.jsx** (Form Fields Component)
- **Location**: `register-school/RegisterSchoolForm.jsx`
- **Purpose**: Individual form field components and layout
- **Key Features**:
  - Organized into 6 sections
  - Real-time error display
  - File upload with drag-and-drop UI
  - Color picker with presets
  - Character count for textarea
  - Responsive input layouts

**Props**:
- `formData`: Current form values
- `errors`: Validation errors
- `onInputChange`: Text/select input change handler
- `onFileChange`: File input handler
- `onColorChange`: Color picker handler
- `onRemoveFile`: File removal handler

**Form Sections**:
1. **Basic Information**: School name, type, location, founded year
2. **Contact Information**: Principal name, email, phone, website
3. **School Statistics**: Total students, total teachers
4. **About School**: Description, motto, accreditation
5. **School Branding**: Logo and banner upload
6. **School Colors**: Primary and secondary color selection

### 3. **validation.js** (Validation Rules)
- **Location**: `register-school/validation.js`
- **Purpose**: Form validation rules and helper functions

**Exports**:
- `validationRules`: Object with field-specific validation rules
- `validateField(fieldName, value)`: Validates single field
- `validateFile(fieldName, file)`: Validates file size and type
- `validateForm(formData)`: Validates entire form
- `getInitialFormState()`: Returns empty form state
- `schoolTypes`: Array of school type options
- `colorPresets`: Array of color preset combinations

**Validation Rules**:
```javascript
{
  schoolName: { required: true, minLength: 2, maxLength: 100, pattern: alphanumeric },
  description: { required: true, minLength: 20, maxLength: 500 },
  location: { required: true, minLength: 5, maxLength: 200 },
  type: { required: true, enum: ['Public', 'Private', 'NGO'] },
  foundedYear: { required: true, min: 1800, max: currentYear },
  principalName: { required: true, minLength: 2, maxLength: 100 },
  phone: { required: true, pattern: phoneRegex },
  email: { required: true, pattern: emailRegex },
  website: { required: false, pattern: urlRegex },
  totalStudents: { required: true, min: 1, max: 10000 },
  totalTeachers: { required: true, min: 1, max: 1000 },
  accreditation: { required: false, minLength: 3, maxLength: 100 },
  motto: { required: false, minLength: 5, maxLength: 200 },
  logo: { required: true, maxSize: 5MB, type: 'image' },
  banner: { required: true, maxSize: 5MB, type: 'image' },
  primaryColor: { required: true },
  secondaryColor: { required: true }
}
```

## Integration with School.jsx

### Changes Made:
1. **Added Import**:
   ```jsx
   import RegisterSchool from './register-school/RegisterSchool';
   ```

2. **Added State**:
   ```jsx
   const [showRegisterModal, setShowRegisterModal] = useState(false);
   const [schools, setSchools] = useState(schoolsData);
   ```

3. **Updated Button Handler**:
   ```jsx
   <Button 
       onClick={() => setShowRegisterModal(true)}
       className="..."
   >
       Register new school
   </Button>
   ```

4. **Added Modal Component**:
   ```jsx
   <RegisterSchool 
       isOpen={showRegisterModal}
       onClose={() => setShowRegisterModal(false)}
       onRegister={handleRegisterSchool}
   />
   ```

5. **Added Registration Handler**:
   ```jsx
   const handleRegisterSchool = (newSchool) => {
       setSchools(prev => [newSchool, ...prev]);
   };
   ```

## Form Fields Details

### Required Fields (*)
- School Name
- School Type
- Location
- Founded Year
- Principal Name
- Email
- Phone
- Total Students
- Total Teachers
- Logo (image upload)
- Banner (image upload)
- Primary Color
- Secondary Color

### Optional Fields
- Website
- Accreditation
- School Motto

## File Upload Specifications

### Image Requirements:
- **Formats Accepted**: PNG, JPG, GIF
- **Maximum Size**: 5MB per file
- **Fields**: Logo, Banner
- **Preview**: Shows image preview with option to remove

### Upload Handling:
1. User selects file via drag-and-drop or click
2. File is validated (size, type)
3. FileReader creates preview using `readAsDataURL()`
4. Preview is displayed in form
5. On submit, file object is included in form submission
6. Original component can process file or convert to base64

## Styling & Responsiveness

### Breakpoints:
- **xs** (extra small): 0-375px
- **sm** (small): 376-640px
- **md** (medium): 641-1024px
- **lg** (large): 1025px+

### Dark Mode:
All components support dark mode using `dark:` prefix Tailwind classes.

### Color Presets (6 options):
1. **Blue** - #3B82F6
2. **Indigo** - #6366F1
3. **Purple** - #A855F7
4. **Green** - #10B981
5. **Orange** - #F97316
6. **Red** - #EF4444

## Data Structure

### New School Object Created:
```javascript
{
  id: string (generated from timestamp),
  name: string,
  logo: string (base64 or file),
  banner: string (base64 or file),
  description: string,
  location: string,
  type: string,
  contact: {
    phone: string,
    email: string,
    website: string
  },
  foundedYear: number,
  principalName: string,
  totalStudents: number,
  totalTeachers: number,
  verified: boolean (false),
  followers: number (0),
  createdAt: ISO date string,
  updatedAt: ISO date string,
  motto: string,
  accreditation: string,
  colors: [primaryColor, secondaryColor]
}
```

## Usage Example

### Opening the Modal:
```jsx
// In School component or elsewhere
<Button onClick={() => setShowRegisterModal(true)}>
    Register New School
</Button>

<RegisterSchool 
    isOpen={showRegisterModal}
    onClose={() => setShowRegisterModal(false)}
    onRegister={(newSchool) => {
        // Handle new school - add to list, save to DB, etc.
        console.log('New school:', newSchool);
    }}
/>
```

### Form Submission Flow:
1. User fills out all required fields
2. User uploads logo and banner images
3. User selects primary and secondary colors
4. User clicks "Register School" button
5. Form validates all fields and files
6. If validation passes:
   - Loading spinner shows
   - New school object is created
   - `onRegister` callback is called with school data
   - Success message displays
   - Modal closes after 1.5 seconds
7. If validation fails:
   - Error messages appear below each field
   - Submit button remains enabled

## Error Handling

### Validation Errors:
- Displayed below each field in red
- Includes field-specific error message
- Example: "School name must be between 2 and 100 characters"

### File Upload Errors:
- File size exceeds 5MB
- File type is not an image
- Both show red outline on file input area

### Submit Errors:
- Network error or server error
- Shows error message in red banner at top
- Form data is retained for retry

## Browser Compatibility

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Form labels associated with inputs via `<label>`
- Error messages linked to fields
- Buttons have proper `aria-label` attributes
- Color contrast meets WCAG AA standards
- Keyboard navigation fully supported
- Focus states visible

## Future Enhancements

### Potential Improvements:
1. **Database Integration**: Save schools to backend
2. **Email Verification**: Verify school email before activation
3. **Document Upload**: Allow uploading accreditation documents
4. **Map Integration**: Select location from map
5. **Multi-language**: Support for multiple languages
6. **Bulk Import**: Import multiple schools via CSV
7. **Approval Workflow**: Admin approval before school goes live
8. **Social Verification**: Verify school social media accounts

## Troubleshooting

### Modal Not Opening:
- Check `showRegisterModal` state is set to `true`
- Verify button has `onClick={() => setShowRegisterModal(true)}`
- Check browser console for errors

### Form Not Submitting:
- Check all required fields are filled
- Verify no validation errors are displayed
- Check file uploads are valid (size, type)
- Check browser console for errors

### Files Not Uploading:
- Verify file is under 5MB
- Verify file is image format (PNG, JPG, GIF)
- Check browser console for errors

### Dark Mode Not Working:
- Verify dark mode provider is active
- Check `dark:` prefixed classes in CSS
- Verify Tailwind dark mode is enabled in config

## Performance Considerations

- Form validation runs on change but debounced
- File preview conversion uses FileReader (async)
- Modal uses portal (fixed positioning) to avoid z-index issues
- Image previews are data URLs (inline base64)
- Form state updates are batched to prevent re-renders

## Security Considerations

- Client-side file validation (size, type)
- Server-side validation required before saving
- Sanitize school name to prevent XSS
- Validate all fields before database insertion
- Use HTTPS for file uploads
- Consider rate limiting for form submissions

## Testing Checklist

- [ ] Modal opens when button clicked
- [ ] Modal closes when X or Cancel clicked
- [ ] All form fields accept input
- [ ] Validation errors show for empty required fields
- [ ] File uploads show preview
- [ ] File removes when X clicked
- [ ] Color picker allows selection
- [ ] Form submits with all required data
- [ ] Success message displays
- [ ] Modal closes after submission
- [ ] New school appears in list
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark mode works correctly
- [ ] Keyboard navigation works

## Related Files

- `School.jsx` - Main school listing page
- `SchoolGroup.jsx` - School group/community page
- `schoolsData` - Schools data (schools.json)
- `Button.jsx` - Button component
- `Input.jsx` - Input component (if created)
- `Modal.jsx` - Modal wrapper (if using separate modal component)

---

**Last Updated**: 2024
**Status**: Complete & Integrated
**Version**: 1.0.0
