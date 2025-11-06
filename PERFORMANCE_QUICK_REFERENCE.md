# Performance Optimizations - Quick Reference

## 🚀 What Changed?

We've implemented automatic performance detection and adaptive rendering to improve load times and performance, especially in AEM.

## 📊 Performance Tiers

Your device is automatically detected and categorized:

- **🟢 High**: Desktop/powerful devices → Full quality (150 particles, 60 FPS)
- **🟡 Medium**: Mid-range devices → Balanced quality (80 particles, 45 FPS)
- **🔴 Low**: Mobile/older devices → Optimized quality (40 particles, 30 FPS)

## 🔧 New Files Created

```
src/js/utils/
├── performanceDetector.js    # Detects device capabilities
├── adaptiveRenderer.js        # Smart rendering controller
└── performanceMonitor.js      # Performance tracking
```

## 📝 Modified Files

```
src/js/background.js           # Integrated performance system
src/main.js                    # Async initialization
```

## 🎮 Testing Tools

### Enable Debug Overlay
Add `?debugPerf` to any URL:
```
https://your-site.com/150?debugPerf
```

Shows real-time FPS, memory, and WebGL stats in top-right corner.

### Browser Console Commands
```javascript
// Check performance metrics
window.shaderBackgroundPerfMonitor.getMetrics()

// View detailed log
window.shaderBackgroundPerfMonitor.log()

// Manually control rendering
window.shaderBackgroundRenderer.pause()
window.shaderBackgroundRenderer.resume()
```

## ⚡ Key Optimizations

1. **Auto-Detection**: Device performance detected on load
2. **Smart Rendering**: Pauses when not visible
3. **Lazy Loading**: Globe model deferred on slow devices
4. **Reduced Particles**: 40-150 based on device
5. **Adaptive FPS**: 30-60 FPS based on capabilities
6. **AEM Detection**: Extra optimizations when embedded
7. **AEM Fallback Mode**: Disables heavy features in Edit Mode (prevents OOM)

## 📈 Expected Results

| Scenario | Improvement |
|----------|-------------|
| Low-end mobile | 40-50% faster load |
| AEM embedded | 30-40% faster load |
| Tab switching | 0% CPU when hidden |
| Slow networks | 2-3s faster initial render |

## ⚠️ Important Notes

- **No Visual Changes**: High-end devices see the same quality
- **Automatic**: No configuration needed
- **Backwards Compatible**: Works in all browsers
- **Graceful Fallback**: Handles missing features
- **AEM Edit Mode**: Automatically disables heavy visuals to prevent OOM errors

## 🐛 Troubleshooting

**Issue**: Performance overlay not showing
- **Fix**: Make sure `?debugPerf` is in URL

**Issue**: Still slow on mobile
- **Check**: Console for detected tier
- **Verify**: Particle count should be 40-80

**Issue**: Globe not loading
- **Expected**: On low-tier devices, loads after 1-2 seconds
- **Check**: Look for "Globe loading" messages in console

**Issue**: Out of Memory in AEM Edit Mode
- **Expected**: Fallback mode automatically activates
- **Check**: Look for "AEM fallback mode detected" in console
- **See**: `AEM_FALLBACK_MODE.md` for details

## 📞 Support

Check `PERFORMANCE_OPTIMIZATIONS.md` for detailed documentation.

Console logs prefixed with:
- `[Background Init]` - Initialization steps
- `[Performance Detector]` - Device detection
- `[Adaptive Renderer]` - Rendering status
- `[Performance Warning]` - Issues detected

---

✅ **Ready to deploy** - No additional configuration needed!

