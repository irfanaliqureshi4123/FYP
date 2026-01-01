# RegisterSchool Feature - Quick Start Guide

## What's New?

The RegisterSchool feature allows users to register new schools through an interactive modal form. The feature includes:

✅ **Form Validation** - All fields validated in real-time
✅ **File Uploads** - Logo and banner with image preview
✅ **Color Picker** - 6 preset school colors
✅ **Responsive Design** - Works on mobile, tablet, desktop
✅ **Dark Mode Support** - Full dark mode compatibility
✅ **Error Handling** - Clear error messages for validation issues

## How to Use

### 1. Access the Feature
- Navigate to **My School** page
- Look for the **"Register new school"** button in the header (top right)
- Click the button to open the registration modal

### 2. Fill Out the Form
The form is organized into 6 sections:

#### Section 1: Basic Information
- **School Name** (required) - Unique name of the school
- **School Type** (required) - Choose: Public, Private, or NGO
- **Location** (required) - City, Country
- **Founded Year** (required) - Year school was established (1800 - current year)

#### Section 2: Contact Information
- **Principal Name** (required) - Full name of school principal
- **Email** (required) - School email address
- **Phone** (required) - School phone number
- **Website** (optional) - School website URL

#### Section 3: School Statistics
- **Total Students** (required) - Number of students (1 - 10,000)
- **Total Teachers** (required) - Number of teachers (1 - 1,000)

#### Section 4: About School
- **School Description** (required) - Detailed description (20-500 characters)
- **School Motto** (optional) - School motto or tagline
- **Accreditation** (optional) - Accreditation details (e.g., ISO 9001, CBSE)

#### Section 5: School Branding
- **School Logo** (required) - Upload school logo image
- **School Banner** (required) - Upload school banner image

#### Section 6: School Colors
- **Primary Color** (required) - Select from 6 preset colors
- **Secondary Color** (required) - Select from 6 preset colors

### 3. Upload Images
For logo and banner:
1. Click on the upload area or drag and drop an image
2. Select an image file (PNG, JPG, GIF)
3. File must be under 5MB
4. Image preview will appear
5. Click the X button to remove and try again

### 4. Select Colors
- Choose from 6 preset color options
- Selected color shows a checkmark
- Both primary and secondary colors are required
- Colors are displayed below the selector

### 5. Submit the Form
1. Verify all required fields are filled
2. Click **"Register School"** button
3. If there are errors:
   - Error messages appear below each field
   - Fix the issues and try again
4. If successful:
   - Loading spinner appears
   - After 1-2 seconds, success message shows
   - Modal automatically closes
   - New school appears at the top of the school list

## Field Validation Rules

### Text Fields:
- **School Name**: 2-100 characters, alphanumeric + special chars
- **Location**: 5-200 characters
- **Principal Name**: 2-100 characters
- **Email**: Valid email format (name@domain.com)
- **Phone**: Valid phone format (+1234567890)
- **Website**: Valid URL (optional)

### Numeric Fields:
- **Founded Year**: 1800 to current year
- **Total Students**: 1 to 10,000
- **Total Teachers**: 1 to 1,000

### Text Area:
- **Description**: 20-500 characters
- **Motto**: 5-200 characters (optional)
- **Accreditation**: 3-100 characters (optional)

### File Uploads:
- **Size**: Maximum 5MB
- **Format**: PNG, JPG, GIF only
- **Both required**: Logo and Banner must be uploaded

### Color Selection:
- Both required (Primary and Secondary)
- Choose from 6 presets or manually enter hex color

## Error Messages

If validation fails, you'll see messages like:

```
● School name is required
● Email must be a valid email address
● Logo must be an image file
● File size cannot exceed 5MB
● Phone must be a valid phone number
```

Fix the issues and submit again.

## Example Data

Here's sample data that would pass validation:

```
School Name: St. Mary's Academy
Type: Private
Location: New York, USA
Founded Year: 1998
Principal Name: Dr. James Anderson
Email: info@stmarys.edu
Phone: +12125551234
Website: https://stmarys.edu
Total Students: 2500
Total Teachers: 125
Description: St. Mary's Academy is a leading private school...
Motto: Excellence Through Education
Accreditation: NYSED, Middle States
```

## Troubleshooting

### "Modal doesn't open"
- Make sure you're on the My School page
- Click the "Register new school" button
- Check if it's already open (check behind other content)

### "File upload fails"
- Check file size (must be under 5MB)
- Check file format (must be PNG, JPG, or GIF)
- Try uploading a different image

### "Form won't submit"
- Check for error messages below each field
- Ensure all required fields (marked with *) are filled
- Both logo and banner must be uploaded
- Both colors must be selected

### "Phone number not accepted"
- Use international format: +country-area-number
- Example: +1-212-555-1234
- Or without hyphens: +12125551234

### "Email not accepted"
- Use valid email format: name@domain.com
- Example: principal@school.edu
- Avoid spaces and special characters in email

### "Dark mode colors look wrong"
- This is normal, form is designed for dark mode
- All elements have proper contrast
- Try switching back to light mode to compare

## What Happens After Registration?

1. **Form Submitted**: Data is collected and validated
2. **Success Message**: "School registered successfully! ✓"
3. **Modal Closes**: Form automatically closes
4. **New School Added**: School appears at top of school list
5. **Ready to Explore**: You can now view the new school

**Note**: Currently, registered schools are added to local state only. To persist data:
- Connect to a backend database
- Use API to save school data
- Implement authentication for school admins

## Features Coming Soon

- 📧 Email verification for school contact
- 📄 Document upload for accreditation
- 🗺️ Map integration for location selection
- 🌐 Multi-language support
- ✅ Admin approval workflow
- 📊 School analytics dashboard
- 💬 Direct messaging with school administrators

## Tips & Best Practices

### For School Names:
- Use the official school name
- Include location if multiple schools with same name
- Keep it clear and easy to read

### For Descriptions:
- Provide detailed information about the school
- Mention special programs or achievements
- Keep professional tone

### For Images:
- Use high-quality images
- Logo should have transparent background
- Banner should be landscape oriented
- Ensure good contrast and visibility

### For Contact Info:
- Use official school email
- Provide direct school phone line
- Include official website if available

### Color Selection:
- Choose colors that match school branding
- Ensure good contrast between primary and secondary
- Consider how colors look in both light and dark modes

## Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Review field validation rules
3. Try using sample data to verify the form works
4. Check browser console (F12) for error messages
5. Contact support with screenshots of the error

## Keyboard Navigation

All form elements are keyboard accessible:
- **Tab**: Move to next field
- **Shift+Tab**: Move to previous field
- **Enter**: Submit form (when focused on submit button)
- **Escape**: Close modal (if modal supports it)
- **Space**: Select radio/checkbox options

## Mobile Tips

On mobile devices:
- Form is optimized for portrait and landscape
- Font sizes are larger for easy reading
- Tap areas are enlarged for easier interaction
- Scroll down to see all form sections
- Image upload is touch-friendly

## Desktop Tips

On desktop:
- Use Tab to navigate between fields
- Use mouse for file drag-and-drop
- Color picker has hover effects
- Submit button shows loading spinner
- Success message appears at top

---

**Enjoy registering your school!** 🎓
