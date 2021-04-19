export default class Item {
  constructor(label, value, edit, create, color = "primary") {
    this.label = label;
    this.value = value;
    this.edit = edit;
    this.create = create;
    this.color = color;
  }
}
