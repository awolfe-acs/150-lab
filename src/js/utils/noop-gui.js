// =============================================================================
// No-op dat.GUI / lil-gui stub for production builds.
// Every method returns `this` (or a new NoopController) so chained calls like
//   gui.addFolder("X").add(obj,"y").onChange(fn)
// silently succeed without pulling in the real library.
// =============================================================================

// Shared stub element whose querySelector always returns a safe sink.
const _stubEl = (() => {
  const el = document.createElement('li');
  const inner = document.createElement('span');
  inner.className = 'property-name';
  el.appendChild(inner);
  return el;
})();

class NoopController {
  constructor() {
    // dat.gui stores the controller's <li> wrapper here; code may drill into it
    this.__li = _stubEl;
    // Some loops check `controller.property` / `controller.object`
    this.property = '';
    this.object = null;
  }
  onChange()  { return this; }
  onFinishChange() { return this; }
  setValue()  { return this; }
  getValue()  { return undefined; }
  updateDisplay() { return this; }
  listen()    { return this; }
  name()      { return this; }
  min()       { return this; }
  max()       { return this; }
  step()      { return this; }
  options()   { return this; }
  disable()   { return this; }
  enable()    { return this; }
  show()      { return this; }
  hide()      { return this; }
  destroy()   {}
  remove()    {}
}

class NoopGUI {
  constructor() {
    this.domElement = document.createElement('div');
    this.closed = true;
    this.__controllers = [];
    this.__folders = {};
  }

  add()      { return new NoopController(); }
  addColor() { return new NoopController(); }
  addFolder(name) {
    const folder = new NoopGUI();
    this.__folders[name] = folder;
    return folder;
  }
  remove()    {}
  destroy()   {}
  close()     { this.closed = true; return this; }
  open()      { this.closed = false; return this; }
  hide()      { return this; }
  show()      { return this; }
  listen()    { return this; }
  remember()  {}
  onChange()   { return this; }
  onFinishChange() { return this; }
  title()     { return this; }
}

// dat.gui exposes the constructor as `dat.GUI`
export { NoopGUI as GUI };
export default { GUI: NoopGUI };
