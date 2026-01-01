# RegisterSchool Feature - Visual & Architecture Guide

## 🏗️ Component Architecture

```
School (Parent Component)
├── state: showRegisterModal, schools
├── handlers: handleRegisterSchool()
└── JSX:
    ├── Header Section
    │   ├── Title & Description
    │   └── "Register new school" Button
    │       └── onClick={() => setShowRegisterModal(true)}
    │
    ├── Search & Filter Section
    │
    ├── Schools Grid
    │   └── School Cards (mapped from schools state)
    │
    └── RegisterSchool Modal (conditional render)
        └── isOpen={showRegisterModal}
            onClose={() => setShowRegisterModal(false)}
            onRegister={handleRegisterSchool}
```

---

## 🎭 RegisterSchool Component Structure

```
RegisterSchool Modal
│
├── state:
│   ├── formData (form field values)
│   ├── errors (validation errors)
│   ├── isSubmitting (loading state)
│   └── submitMessage (success/error feedback)
│
├── handlers:
│   ├── handleInputChange() → updates formData
│   ├── handleFileChange() → creates preview
│   ├── handleColorChange() → updates colors
│   ├── handleRemoveFile() → removes uploads
│   ├── handleSubmit() → validates & submits
│   └── handleClose() → resets & closes
│
└── JSX:
    ├── Fixed Backdrop (dark overlay)
    ├── Modal Container
    │   ├── Sticky Header
    │   │   ├── Title
    │   │   └── Close (X) Button
    │   ├── Content Area (scrollable)
    │   │   ├── Submit Message (conditional)
    │   │   └── Form Component
    │   │       └── RegisterSchoolForm
    │   └── Footer (sticky)
    │       ├── Cancel Button
    │       └── Register School Button
    │           (shows spinner when loading)
    │
    └── RegisterSchoolForm (child component)
        ├── Section 1: Basic Information
        ├── Section 2: Contact Information
        ├── Section 3: School Statistics
        ├── Section 4: About School
        ├── Section 5: School Branding
        └── Section 6: School Colors
```

---

## 📋 Form Field Hierarchy

```
RegisterSchoolForm
│
├── renderErrorMessage() helper
├── renderTextInput() helper (14 fields)
├── renderNumberInput() helper (3 fields)
├── renderSelectInput() helper (1 field)
├── renderTextarea() helper (1 field)
├── renderFileUpload() helper (2 fields)
├── renderColorPicker() helper (2 color selections)
│
└── Form Sections (6 total):
    │
    ├── Section 1: Basic Information
    │   ├── schoolName (text input)
    │   ├── type (select dropdown)
    │   ├── location (text input)
    │   └── foundedYear (number input)
    │
    ├── Section 2: Contact Information
    │   ├── principalName (text input)
    │   ├── email (email input)
    │   ├── phone (tel input)
    │   └── website (url input)
    │
    ├── Section 3: School Statistics
    │   ├── totalStudents (number input)
    │   └── totalTeachers (number input)
    │
    ├── Section 4: About School
    │   ├── description (textarea)
    │   ├── motto (text input)
    │   └── accreditation (text input)
    │
    ├── Section 5: School Branding
    │   ├── logo (file upload)
    │   └── banner (file upload)
    │
    └── Section 6: School Colors
        ├── primaryColor (color picker with 6 presets)
        └── secondaryColor (color picker with 6 presets)
```

---

## 🔄 Data Flow Diagram

```
User Action → Handler → State Update → Validation → Display

1. User enters text
   └─→ onInputChange()
       └─→ setFormData() updates value
           └─→ Component re-renders
               └─→ Clears error for that field

2. User uploads file
   └─→ onFileChange()
       └─→ setFormData() with file object
           └─→ FileReader.readAsDataURL() async
               └─→ setFormData() with preview
                   └─→ Component re-renders with preview

3. User selects color
   └─→ onColorChange()
       └─→ setFormData() updates color
           └─→ Component re-renders
               └─→ Shows checkmark on selected

4. User clicks Register
   └─→ handleSubmit()
       └─→ validateForm(formData)
           ├─→ If errors: setErrors() → show messages
           └─→ If valid: 
               ├─→ setIsSubmitting(true)
               ├─→ Create school object
               ├─→ Call onRegister(school)
               ├─→ handleRegisterSchool() adds to schools[]
               ├─→ Show success message
               ├─→ setTimeout() → handleClose()
               └─→ Modal closes, form resets

5. User closes modal
   └─→ handleClose()
       ├─→ Reset formData
       ├─→ Clear errors
       ├─→ Clear messages
       └─→ Call onClose() callback
           └─→ School component sets modal to false
```

---

## 🎨 UI Layout Structure

### Desktop Layout (1200px+):
```
┌─────────────────────────────────────────────────────┐
│  RegisterSchool Modal (600px wide, centered)         │
├─────────────────────────────────────────────────────┤
│ [Title] [X Close]                      [Sticky Top] │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Section 1: Basic Information                       │
│  ┌──────────────────┬──────────────────┐            │
│  │ School Name      │ School Type      │ 2 cols     │
│  ├──────────────────┼──────────────────┤            │
│  │ Location         │ Founded Year     │            │
│  └──────────────────┴──────────────────┘            │
│                                                      │
│  Section 2: Contact Information                     │
│  ┌──────────────────┬──────────────────┐            │
│  │ Principal Name   │ Email            │ 2 cols     │
│  ├──────────────────┼──────────────────┤            │
│  │ Phone            │ Website          │            │
│  └──────────────────┴──────────────────┘            │
│                                                      │
│  ... more sections ...                              │
│                                                      │
├─────────────────────────────────────────────────────┤
│                    [Cancel] [Register School]       │
│                                                [Sticky Bottom]
└─────────────────────────────────────────────────────┘
```

### Mobile Layout (375px):
```
┌──────────────────────────────┐
│ [Title] [X]       [Sticky]   │
├──────────────────────────────┤
│                              │
│ Section 1: Basic Info        │
│ ┌──────────────────────────┐ │
│ │ School Name              │ │ 1 col
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ School Type              │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ Location                 │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ Founded Year             │ │
│ └──────────────────────────┘ │
│                              │
│ ... more sections ...        │
│                              │
├──────────────────────────────┤
│ [Cancel] [Register]          │
│           [Sticky Bottom]    │
└──────────────────────────────┘
```

---

## 🎯 User Interaction Flow

```
START
  │
  ▼
[User sees "Register new school" button]
  │
  ▼
[User clicks button]
  │
  ▼
[Modal opens with form]
  │
  ├─→ User fills form (can go back/forth)
  │   ├─→ Type in fields
  │   ├─→ Upload files (see preview)
  │   ├─→ Select colors
  │   └─→ Loop back if needed
  │
  ├─→ User clicks "Register School"
  │   │
  │   ▼
  │   [Form validates]
  │   │
  │   ├─→ If ERRORS:
  │   │   ├─→ Error messages appear
  │   │   ├─→ User stays in form
  │   │   └─→ User fixes and retries
  │   │
  │   └─→ If VALID:
  │       ├─→ Loading spinner appears
  │       ├─→ School object created
  │       ├─→ onRegister called
  │       ├─→ School added to list
  │       ├─→ Success message shows
  │       ├─→ Wait 1.5 seconds
  │       └─→ Modal closes
  │
  └─→ User clicks "Cancel" or [X]
      └─→ Modal closes without saving
        
END
```

---

## 📊 State Machine Diagram

```
INITIAL
  │
  ├─→ formData: empty
  ├─→ errors: empty
  ├─→ isSubmitting: false
  └─→ submitMessage: empty
  
         ↓ [User enters text]
         
EDITING
  │
  ├─→ formData: updated values
  ├─→ errors: cleared for edited field
  ├─→ isSubmitting: false
  └─→ submitMessage: empty
  
    ↓ [User clicks Register] ├─→ [User clicks Cancel/X]
    │                        │
    VALIDATING               CLOSING
    │                        │
    ├─→ formData: unchanged  ├─→ formData: reset
    ├─→ errors: validating   ├─→ errors: cleared
    ├─→ isSubmitting: false  ├─→ isSubmitting: false
    └─→ submitMessage: empty └─→ submitMessage: cleared
    
    │   ↓ [Validation fails]  │   ↓ [Modal closes]
    │   │                    │   │
    │   ERROR_STATE          CLOSED
    │   │
    │   ├─→ formData: unchanged
    │   ├─→ errors: populated
    │   ├─→ isSubmitting: false
    │   └─→ submitMessage: empty
    │
    │   ↓ [User fixes errors]
    │   └─→ Back to EDITING
    
    ↓ [Validation passes]
    
SUBMITTING
    │
    ├─→ formData: unchanged
    ├─→ errors: empty
    ├─→ isSubmitting: true
    └─→ submitMessage: empty
    
    ↓ [API call succeeds]
    
SUCCESS
    │
    ├─→ formData: unchanged
    ├─→ errors: empty
    ├─→ isSubmitting: false
    └─→ submitMessage: "School registered successfully! ✓"
    
    ↓ [Timeout 1.5s]
    
CLOSING
    │
    ├─→ formData: reset
    ├─→ errors: cleared
    ├─→ isSubmitting: false
    └─→ submitMessage: cleared
    
    ↓
    
CLOSED
```

---

## 🔍 Validation Flow

```
validateForm(formData)
│
├─→ For each field:
│   │
│   ├─→ validateField(fieldName, value)
│   │   │
│   │   ├─→ Check if required: ✗ required but empty
│   │   ├─→ Check min length: ✗ too short
│   │   ├─→ Check max length: ✗ too long
│   │   ├─→ Check pattern: ✗ invalid format
│   │   ├─→ Check enum: ✗ not in list
│   │   ├─→ Check min value: ✗ too small
│   │   ├─→ Check max value: ✗ too large
│   │   │
│   │   └─→ If ANY fail: return error message
│   │
│   ├─→ For file fields:
│   │   │
│   │   └─→ validateFile(fieldName, file)
│   │       ├─→ Check file exists
│   │       ├─→ Check file size (max 5MB)
│   │       ├─→ Check file type (image only)
│   │       └─→ If ANY fail: return error message
│   │
│   └─→ Collect all errors in object
│
└─→ Return:
    ├─→ If no errors: {} (empty object)
    └─→ If errors: { fieldName: "error message", ... }
```

---

## 🎨 Color & Styling Hierarchy

### Modal Structure Colors:
```
┌─ Fixed Backdrop
│  Background: black/50% opacity (dark:black/50%)
│
└─ Modal Box
   ├─ Header (sticky)
   │  Background: gradient (blue-50 to indigo-50)
   │  Dark: gradient (blue-900/20 to indigo-900/20)
   │  Border: bottom gray-200 | dark:gray-700
   │  Text: gray-900 | dark:white
   │
   ├─ Content Area
   │  Background: white | dark:gray-800
   │  Border: gray-200 | dark:gray-700
   │  Text: gray-900 | dark:white
   │
   ├─ Form Sections
   │  Border: bottom gray-200 | dark:gray-700
   │  Text: gray-700 | dark:gray-300
   │
   ├─ Input Fields
   │  Background: white | dark:gray-700
   │  Border: gray-300 | dark:gray-600
   │  Text: gray-900 | dark:white
   │  Focus: ring-blue-400 | dark:ring-blue-600
   │  Error: border-red-500, ring-red-400
   │
   ├─ Buttons
   │  Primary: blue background, white text
   │  Secondary: gray background, gray text
   │  Hover: darker shade
   │
   └─ Footer (sticky)
      Background: white | dark:gray-800
      Border: top gray-200 | dark:gray-700
```

### Error Display Colors:
```
Error State
├─ Field Border: red-500 | dark:red-400
├─ Field Focus Ring: red-400 | dark:red-600
├─ Error Text: red-600 | dark:red-400
└─ Error Icon: ● red
```

### Success Display Colors:
```
Success Message
├─ Background: green-100 | dark:green-900/30
├─ Text: green-700 | dark:green-300
└─ Icon: ✓ green
```

---

## 📱 Responsive Breakpoints

```
0px → 375px (xs - phones)
│
├─ Modal Width: full (100%)
├─ Padding: p-3
├─ Font Size: text-xs/sm
├─ Buttons: full width
└─ Layout: 1 column
│
375px → 640px (sm - phones/small tablets)
│
├─ Modal Width: ~90%
├─ Padding: p-4
├─ Font Size: text-sm/base
├─ Buttons: responsive width
└─ Layout: 1 column (mostly)
│
640px → 1024px (md - tablets)
│
├─ Modal Width: ~85%
├─ Padding: p-5
├─ Font Size: text-base
├─ Buttons: inline
└─ Layout: 2 columns (some sections)
│
1024px+ (lg - desktops)
│
├─ Modal Width: max-w-2xl (672px)
├─ Padding: p-6
├─ Font Size: text-base
├─ Buttons: inline
└─ Layout: 2 columns (all sections)
```

---

## ♿ Accessibility Features Map

```
Modal Dialog
├─ Backdrop: prevents interaction outside
├─ Focus trap: keeps focus within modal
├─ Close button: easy dismissal
│
Form Structure
├─ Labels: associated with inputs via htmlFor
├─ Required indicators: * asterisk
├─ Error messages: linked to fields
├─ Help text: below inputs
│
Input Fields
├─ Proper type attribute (email, tel, number, etc.)
├─ Placeholder text: helpful hint
├─ Focus states: visible outline
├─ Error states: color + icon (not just color)
│
Buttons
├─ aria-label: for icon buttons
├─ Focus state: visible
├─ Disabled state: visual + functional
├─ Loading state: text changes + spinner
│
Color Contrast
├─ Text on background: ≥4.5:1 (WCAG AA)
├─ Focus rings: visible and distinct
└─ Error indicators: color + icon
│
Keyboard Navigation
├─ Tab: move to next field
├─ Shift+Tab: move to previous field
├─ Enter: submit form
├─ Space: activate buttons
└─ All functions available via keyboard
```

---

## 🔐 Security Layers

```
Client Side
├─ Input validation
├─ File size check
├─ File type check
├─ Required field check
└─ Pattern matching

Server Side (Future)
├─ Request validation
├─ Input sanitization
├─ File verification
├─ Authorization check
├─ Rate limiting
└─ Database constraints
```

---

## 📊 Component Hierarchy Summary

```
Level 0 (Parent)
└─ School Component

Level 1 (Modal)
└─ RegisterSchool Component (conditional render)

Level 2 (Form Container)
└─ RegisterSchoolForm Component (child of modal)

Level 3 (Form Inputs)
└─ Input fields rendered via helper functions

Level 4 (Shared Components)
├─ Button Component (used in modal)
└─ Lucide Icons (used throughout)

External Dependencies
├─ React (hooks)
├─ Lucide React (icons)
└─ Tailwind CSS (styling)
```

---

**Visual Architecture Complete**

This guide provides a comprehensive visual representation of the RegisterSchool feature's structure, flow, and layout. Use this alongside the technical documentation for a complete understanding of the implementation.
