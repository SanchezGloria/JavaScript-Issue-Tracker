import newIssue from './dom/newIssue.js';
import ls from './service/ls.js';

// get DOM elements

const addBtn = document.querySelector('.btn.btn-primary');
// const addBtn = document.getElementById('issueInputForm');
let issueDesc = document.getElementById('issueDescInput');

console.log(addBtn);

let issueSeverity = document.getElementById('issueSeverityInput');
let issueAssignedTo = document.getElementById('issueAssignedToInput');
let issuesList = document.getElementById('issuesList');
// let btnDelete = document.querySelector('.js-btn');
// console.log(btnDelete);

// variables, constants, objects
// let issues = {};
let issuesArray = [];

const startApp = () => {
  if (ls.isValid()) {
    issuesArray = ls.get();
    render();
    // newIssue.render(issuesArray);
    // listenIssueEvents();
  } else {
    ls.set(issuesArray);
    render();
    // listenIssueEvents();
  }
};

function saveIssue(e) {
  let issueBtns = document.querySelectorAll('.js-click');
  console.log(issueBtns);

  e.preventDefault();
  // let issuesArray = [];
  let issueId = chance.guid();
  let issueStatus = 'Open';
  let issue = {
    id: issueId,
    description: issueDesc.value,
    severity: issueSeverity.value,
    assignedTo: issueAssignedTo.value,
    status: issueStatus,
  };
  let issueIndex = issuesArray.findIndex((item) => item.id === issue.id);
  if (issueIndex === -1) {
    issuesArray.push(issue);
    newIssue.render(issuesArray);
    // listenIssueEvents();
  }
  ls.set(issuesArray);
}

function handleIssue(ev) {
  debugger;
  const dataset = ev.currentTarget.dataset;
  if (dataset.action === 'close-issue') {
    const id = ev.currentTarget.dataset.issueId;
    const issueFound = issuesArray.find((item) => item.id === id);
    if (issueFound.status === 'Open') {
      issueFound.status = 'Closed';
      console.log(issueFound.status);
      // newIssue.render(issuesArray);
      // ls.set(issuesArray);
    }
  } else if (dataset.action === 'delete-issue') {
    const id = ev.currentTarget.dataset.issueId;
    const issueFound = issuesArray.findIndex((item) => item.id === id);
    issuesArray.splice(issueFound, 1);
    console.log(issuesArray);
    // newIssue.render(issuesArray);
    // ls.set(issuesArray);
  }
  ls.set(issuesArray);
  render();
}

// listeners

function render() {
  newIssue.render(issuesArray);
  listenEvents('.js-click', 'click', handleIssue);
}

const listenEvents = (selector, eventType, eventHandler) => {
  debugger;
  // clase, evento, tipo
  const elements = document.querySelectorAll(selector);
  for (const element of elements) {
    element.addEventListener(eventType, eventHandler);
  }
};

addBtn.addEventListener('click', saveIssue);

startApp();
