import newIssue from './dom/newIssue.js';
import ls from './service/ls.js';

// get DOM elements

const addIssueBtn = document.querySelector('.btn.btn-primary');
let issueDesc = document.getElementById('issueDescInput');
let issueSeverity = document.getElementById('issueSeverityInput');
let issueAssignedTo = document.getElementById('issueAssignedToInput');
let issuesList = document.getElementById('issuesList');

// declare var, obj, arrays

let issuesArray = [];

function startApp() {
  if (ls.isValid()) {
    issuesArray = ls.get();
    render();
  } else {
    ls.set(issuesArray);
    render();
  }
}

function paintNewIssue(ev) {
  ev.preventDefault();

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
    render();
  }
  ls.set(issuesArray);
}

function handleIssue(ev) {
  const dataset = ev.currentTarget.dataset;
  if (dataset.action === 'close-issue') {
    const id = ev.currentTarget.dataset.issueId;
    const issueFound = issuesArray.find((item) => item.id === id);
    if (issueFound.status === 'Open') {
      issueFound.status = 'Closed';
    }
  } else if (dataset.action === 'delete-issue') {
    const id = ev.currentTarget.dataset.issueId;
    const issueFound = issuesArray.findIndex((item) => item.id === id);
    issuesArray.splice(issueFound, 1);
  }
  ls.set(issuesArray);
  render();
}

// render

function render() {
  newIssue.render(issuesArray);
  listenEvents();
}

// listeners

addIssueBtn.addEventListener('click', paintNewIssue);

function listenEvents() {
  const elements = document.querySelectorAll('.js-click');
  for (const element of elements) {
    element.addEventListener('click', handleIssue);
  }
}

startApp();
