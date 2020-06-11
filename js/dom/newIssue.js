import helpers from './helpers.js';
const render = (issue) => {
  let issuesList = document.getElementById('issuesList');
  // renderList(issuesList, issue);

  issuesList.innerHTML = '';

  issue.forEach((issue) => {
    console.log(issue.id);

    renderList(issuesList, issue);
  });
};

const renderList = (parent, issue) => {
  const listEl = helpers.appendElement(parent, {
    tag: 'div',
    class: 'well',
  });
  const idEl = helpers.appendElement(listEl, {
    tag: 'h6',
    text: `Issue ID: ${issue.id}`,
  });
  const statusEl = helpers.appendElement(listEl, {
    tag: 'p',
  });
  const statusSpanEl = helpers.appendElement(statusEl, {
    tag: 'span',
    class: 'label label-info',
    text: `${issue.status}`,
  });
  const descriptionEl = helpers.appendElement(listEl, {
    tag: 'h3',
    text: `${issue.description}`,
  });
  const severityEl = helpers.appendElement(listEl, {
    tag: 'p',
    // text: `${issue.severity}`,
  });
  const severitySpanEl = helpers.appendElement(severityEl, {
    tag: 'span',
    class: 'glyphicon glyphicon-time',
    text: ` ${issue.severity}`,
  });
  const userEl = helpers.appendElement(listEl, {
    tag: 'p',
    // text: `${issue.assignedTo}`,
  });
  const userSpanEl = helpers.appendElement(userEl, {
    tag: 'span',
    class: 'glyphicon glyphicon-user',
    text: ` ${issue.assignedTo}`,
  });
  const closeBtn = helpers.appendElement(listEl, {
    tag: 'a',
    text: 'Close',
    href: '#',
    class: 'js-click btn btn-warning',
    dataset: {
      action: 'close-issue',
      issueId: issue.id,
    },
  });
  const deleteBtn = helpers.appendElement(listEl, {
    tag: 'a',
    text: 'Delete',
    href: '#',
    class: 'js-click btn btn-danger',
    dataset: {
      action: 'delete-issue',
      issueId: issue.id,
    },
    // renderCloseBtn(listEl, list);
  });
  console.log(deleteBtn);
};

export default {
  render: render,
};
