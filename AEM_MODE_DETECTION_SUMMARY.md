# AEM Mode Detection - Quick Reference

## TL;DR - When Does Fallback Mode Trigger?

**ONLY** in these specific cases:
1. ❌ URL contains `/editor.html/`
2. ❌ URL contains `wcmmode=edit` or `wcmmode=design`
3. ❌ AEM Edit UI elements present (`.aem-AuthorLayer-Edit`)

**NEVER** in these cases:
1. ✅ `localhost` or any dev port (3000, 4200, 5173, 8080, etc.)
2. ✅ URL contains `wcmmode=disabled`
3. ✅ URL contains `wcmmode=preview`
4. ✅ URL has no `/editor.html/` and no `wcmmode=edit`
5. ✅ Regular publish site

## Visual Decision Tree

```
┌─────────────────────────────────────┐
│ Is this localhost or dev port?     │
│ (localhost, 127.0.0.1, :5173, etc) │
└──────────┬──────────────────────────┘
           │
       Yes │ No
           ↓                           
    ┌──────────┐              ┌────────────────────────┐
    │ PUBLISH  │              │ Check URL parameters   │
    │ (Full)   │              └────────┬───────────────┘
    └──────────┘                       │
                                       ↓
                        ┌──────────────────────────────┐
                        │ Contains wcmmode=disabled?   │
                        └──────────┬───────────────────┘
                                   │
                               Yes │ No
                                   ↓                    
                            ┌──────────┐         ┌────────────────────────┐
                            │ PUBLISH  │         │ Contains /editor.html/ │
                            │ (Full)   │         │ OR wcmmode=edit?       │
                            └──────────┘         └────────┬───────────────┘
                                                           │
                                                       Yes │ No
                                                           ↓                    
                                                    ┌──────────┐         ┌────────────────────┐
                                                    │ FALLBACK │         │ Contains           │
                                                    │ (Edit)   │         │ wcmmode=preview?   │
                                                    └──────────┘         └────────┬───────────┘
                                                                                  │
                                                                              Yes │ No
                                                                                  ↓                    
                                                                           ┌──────────┐    ┌──────────┐
                                                                           │ LIMITED  │    │ PUBLISH  │
                                                                           │ (Preview)│    │ (Full)   │
                                                                           └──────────┘    └──────────┘
```

## Mode Comparison Table

| URL Example | Mode | Background | Particles | Animations | Audio | Memory |
|-------------|------|------------|-----------|------------|-------|--------|
| `localhost:5173` | **Publish** | ✅ | ✅ | ✅ | ✅ | 120-165MB |
| `?wcmmode=disabled` | **Publish** | ✅ | ✅ | ✅ | ✅ | 120-165MB |
| `/content/acs/150.html` | **Publish** | ✅ | ✅ | ✅ | ✅ | 120-165MB |
| `?wcmmode=preview` | **Limited** | ✅ | ✅ | ✅ | ❌ | 120-165MB |
| `/editor.html/content/...` | **Fallback** | ❌ | ❌ | ❌ | ❌ | 20-40MB |
| `?wcmmode=edit` | **Fallback** | ❌ | ❌ | ❌ | ❌ | 20-40MB |

## Console Detection Messages

### Publish Mode (Full Features)
```javascript
[AEM Mode Detector] Development environment detected - skipping AEM detection
[AEM Mode Detector] Detection complete: {
  mode: 'publish',
  isDevelopment: true,
  isPublishMode: true
}
```

### Publish Mode (wcmmode=disabled)
```javascript
[AEM Mode Detector] wcmmode=disabled detected - using publish mode
[AEM Mode Detector] Detection complete: {
  mode: 'publish',
  isPublishMode: true
}
```

### Limited Mode (Preview)
```javascript
[AEM Mode Detector] Preview mode detected via URL
[AEM Mode Detector] Detection complete: {
  mode: 'preview',
  isAuthorMode: true,
  isPreviewMode: true
}
```

### Fallback Mode (Edit)
```javascript
[AEM Mode Detector] Edit mode detected via URL
[AEM Mode Detector] Detection complete: {
  mode: 'edit',
  isAuthorMode: true,
  isEditMode: true
}
```

## Common Scenarios

### ✅ Author wants to preview page with full visuals

**URL**: `https://author.example.com/content/acs/150.html?wcmmode=disabled`

**Result**: Full mode - all features enabled

**Or**: `https://author.example.com/content/acs/150.html?wcmmode=preview`

**Result**: Limited mode - all visuals enabled (audio disabled)

---

### ✅ Author editing content in AEM

**URL**: `https://author.example.com/editor.html/content/acs/150.html`

**Result**: Fallback mode - minimal features to prevent OOM

**Or**: `https://author.example.com/content/acs/150.html?wcmmode=edit`

**Result**: Fallback mode - minimal features to prevent OOM

---

### ✅ Developer working on localhost

**URL**: `http://localhost:5173`

**Result**: Publish mode - full features enabled (always)

---

### ✅ Page published to production

**URL**: `https://www.acs.org/150`

**Result**: Publish mode - full features enabled

---

### ✅ Page on AEM publish instance

**URL**: `https://publish.example.com/content/acs/150.html`

**Result**: Publish mode - full features enabled

## Testing Checklist

- [ ] **localhost:5173** → Shows all features (background, particles, animations)
- [ ] **?wcmmode=disabled** → Shows all features
- [ ] **?wcmmode=preview** → Shows all features (except audio)
- [ ] **/editor.html/** → Shows fallback (static background only)
- [ ] **?wcmmode=edit** → Shows fallback (static background only)
- [ ] **Production URL** → Shows all features

## Troubleshooting Commands

```javascript
// Check if development environment
aemModeDetector.isDevelopmentEnvironment()
// Should be true on localhost:5173

// Check detected mode
aemModeDetector.detect()
// Should be 'publish', 'preview', or 'edit'

// Check settings
aemModeDetector.getSettings()
// Shows all feature flags

// Check if fallback mode
aemModeDetector.shouldUseFallbackMode()
// Should be false unless in actual edit mode

// Force publish mode (if needed)
localStorage.setItem('forceAEMMode', 'publish');
location.reload();

// Clear any persisted cookies
document.cookie = "wcmmode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

## Key Takeaways

1. **Fallback mode is RARE** - only in actual AEM editor
2. **Preview gets full visuals** - nearly identical to publish
3. **wcmmode=disabled is king** - always shows full experience
4. **localhost always works** - never triggers fallback
5. **No /editor.html/ = full features** - unless explicitly wcmmode=edit

---

**Last Updated**: November 6, 2025  
**Version**: 2.0.0 (Strict Edit-Only Detection)

