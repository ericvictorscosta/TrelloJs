import {
  Button,
  Input,
  Icon,
  TextArea,
  Section,
  Modal,
} from "./components/ui.js";

export default class App {
  root;
  data;
  listCards;

  constructor() {
    this.root = document.getElementById("root");
    this.data = [];
    this.loadApp();
  }

  loadApp() {
    const ToReceiveBox = Section({ className: "sToReceiveC-Box" });
    this.listCards = ToReceiveBox;
    const sContainerClick = Section({ className: "sContainerClick" });
    const sContainerList = Section({
      className: "uk-child sContainerList",
      content: [ToReceiveBox, sContainerClick],
    });

    const sAddList = Button({
      className: "sAddList",
      content: [Icon("plus"), "Adicionar uma Lista"],
    });

    const sNewListForm = Section({ className: "sNewListForm" });

    const inputForm = Input({
      className: "sInputForm",
      id: "inputForm",
      placeholder: "Insira o título da lista...",
    });

    const sListWrapper = Section({ className: "sListWrapper" });

    const addList = Button({
      className: "addList",
      id: "btnAddList",
      content: "Adicionar Lista",
      click: () => {
        if (inputForm.value.length < 3) {
          inputForm.style.boxShadow = "inset 0 0 0 2px var(--error)";

          return;
        }
        inputForm.style.boxShadow = "inset 0 0 0 2px var(--accept)";

        this.createNewList(inputForm.value);
        inputForm.value = "";
      },
    });

    const exitIcon = Icon("light fa-plus");

    sListWrapper.append(addList, exitIcon);
    sNewListForm.append(inputForm, sListWrapper);
    sContainerClick.append(sAddList, sNewListForm);

    sAddList.addEventListener("click", () => {
      sNewListForm.style.display = "block";
    });

    exitIcon.addEventListener("click", () => {
      sNewListForm.style.display = "none";
    });

    this.root.append(sContainerList);
  }

  createNewList(name) {
    this.data.push({ name: name, tasks: [] });
    this.renderListCards();
  }

  renderListCards() {
    // this.listCards.innerHTML = ""
    this.data.map((card) => {
      this.createListCard(card);
    });
  }

  createListCard(card) {
    const ContainerBox = Section({ className: "containerBox contentList" });
    const WrapperList = Section({
      className: "wrapperList",
      content: ContainerBox,
    });

    this.listCards.append(WrapperList);

    const UkButton = Button({
      className: "uk-button uk-button-default",
      content: Icon("ellipsis"),
    });
    UkButton.setAttribute("aria-haspopup", "true");
    UkButton.setAttribute("aria-expanded", "false");

    const UkDropDown = Section({ className: "uk-dropdown" });
    UkDropDown.setAttribute("uk-dropdown", "");
    UkDropDown.innerHTML = `
          <ul class="uk-nav uk-dropdown-nav">
            <li class="uk-active"><a href="#">OPÇÃO</a></li>
            <li><a class="meuovo">Remover Lista</a></li>
            <li class="uk-nav-header">OPÇÃO</li>
            <li><a href="#">Modifique o Nome</a></li>
            <li><a href="#">Modifique o Nome</a></li>
            <li class="uk-nav-divider"></li> 
            <li><a href="#">Modifique o Nome</a></li>
          </ul>
          `;
    // if(){}
    // const removeList = document.querySelector(".meuovo");
    // removeList.addEventListener("click", () => {
    //   WrapperList.remove();
    // });

    const MenuDropDown = Section({
      className: "sMenuDropDown",
      content: [UkButton, UkDropDown],
    });

    const InputHeader = Input({
      className: "inputHeader",
      value: card.name,
      change: () => {
        card.name = InputHeader.value;
      },
    });

    const Header = Section({
      className: "header",
      content: [InputHeader, MenuDropDown],
    });

    const bodyTasks = Section({ className: "uk-sortable" });
    bodyTasks.setAttribute("uk-sortable", "group: sortable-group");

    card.tasks.map((item) => {
      bodyTasks.append(this.createChildTaskCard(item.title));
    });

    ContainerBox.append(
      Header,
      bodyTasks,
      this.createChildTask(bodyTasks, card)
    );
  }

  cardDetails(task) {
    const moveSize = Icon("regular fa-arrows-maximize");

    const titleHeaderDragable = {
      className: "sHeaderDragable",
      value: task.name,
      change: () => {
        task.name = titleHeaderDragable.value;
        console.log(this.data);
      },
    };

    const cardDet = Section({
      className: "sCardDeailsHeader",
      content: [moveSize, titleHeaderDragable],
    });
    cardDet.append(task.title);
    return cardDet;
  }

  createChildTaskCard(task) {
    const childCardItem = Section({
      className: "uk-card uk-card-default uk-card-body uk-card-small",
      content: task.title,
      click: () => {
        const modal = Modal({ id: "taskCard" });
        modal.append(this.cardDetails(task));
        $(modal).draggable();
      },
    });
    const childCardItemBox = Section({
      className: "uk-margin",
      content: childCardItem,
    });
    return childCardItemBox;
  }

  createChildTask(bodyTasks, card) {
    const cardTitle = TextArea({
      className: "sInputFormc",
      placeholder: "Insira um título para esse cartão...",
    });

    // ----------------------------------
    const addListButton = Button({
      className: "addList",
      content: "Adicionar Cartão",
      click: () => {
        if (cardTitle.value.length < 3) {
          cardTitle.style.boxShadow = "inset 0 0 0 2px var(--error)";

          return;
        }
        cardTitle.style.boxShadow = "inset 0 0 0 2px var(--accept)";
        const task = { title: cardTitle.value };
        card.tasks.push(task);
        bodyTasks.append(this.createChildTaskCard(task));
        cardTitle.value = "";
      },
    });

    const cancelButton = Icon("plus");
    cancelButton.addEventListener("click", () => {
      HandleAddCardTask();
    });

    // ----------------------------------

    const cardFormFooter = Section({ content: [addListButton, cancelButton] });

    const CardFormTask = Section({
      className: "sCardFormTask",
      content: [cardTitle, cardFormFooter],
    });

    const addTaskButton = Button({
      className: "sAddTask",
      content: [Icon("plus"), "Adicionar Job"],
      click: () => {
        HandleAddCardTask();
      },
    });

    const HandleAddCardTask = () => {
      if (CardFormTask.style.display == "block") {
        CardFormTask.style.display = "none";
        addTaskButton.style.display = "block";
        return;
      }
      CardFormTask.style.display = "block";
      addTaskButton.style.display = "none";
    };
    const jobCardActions = Section({ content: [CardFormTask, addTaskButton] });

    return jobCardActions;
  }
}
// ---------------------------------------------
