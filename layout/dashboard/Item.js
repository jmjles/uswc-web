class Item {
  constructor(label, value, edit, create, color = "primary") {
    this.label = label;
    this.value = value;
    this.edit = edit;
    this.create = create;
    this.color = color;
  }
}
class SimpleItem {
  constructor(label, value, component, color = "primary") {
    this.label = label;
    this.value = value;
    this.component = component;
    this.color = color;
  }
}
class AdminItem {
  constructor(label, value, component, color = "primary") {
    this.label = label;
    this.value = value;
    this.component = component;
    this.color = color;
  }
}
export { Item as default, SimpleItem, AdminItem };
