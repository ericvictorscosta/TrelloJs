export const Button = (props) => {
  const obj = document.createElement("button");

  if (props.content) $(obj).append(props.content);
  if (props.click) obj.addEventListener("click", props.click);
  if (props.id) obj.id = props.id;
  if (props.className) obj.className = props.className;

  return obj;
};

export const Icon = (name) => {
  const obj = document.createElement("i");
  obj.className = `fa-solid fa-${name}`;
  return obj;
};

export const Input = (props) => {
  const obj = document.createElement("input");
  obj.type = "text";
  if (props.value) obj.value = props.value;
  if (props.keyup) obj.addEventListener("keyup", props.keyup);
  if (props.change) obj.addEventListener("change", props.change);
  if (props.id) obj.id = props.id;
  if (props.className) obj.className = props.className;
  if (props.placeholder) obj.placeholder = props.placeholder;

  return obj;
};
export const TextArea = (props) => {
  const obj = document.createElement("textarea");
  if (props.value) obj.value = props.value;
  if (props.id) obj.id = props.id;
  if (props.className) obj.className = props.className;
  if (props.placeholder) obj.placeholder = props.placeholder;

  return obj;
};

export const Section = (props) => {
  const obj = document.createElement("div");

  if (props.content) $(obj).append(props.content);
  if (props.id) obj.id = props.id;
  if (props.className) obj.className = props.className;
  if (props.click) obj.addEventListener("click", props.click);

  return obj;
};

export const Modal = (props) => {
  if (!props.id) return;
  let existingModal = document.getElementById(props.id);
  if (existingModal) {
    existingModal.innerHTML = "";
    existingModal.style.display = "block";
    return existingModal;
  }
  existingModal = Section({ className: "sModal", id: props.id });
  document.body.append(existingModal);
  existingModal.style.display = "block";

  return existingModal;
};
