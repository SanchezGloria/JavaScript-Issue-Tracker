const appendElement = (parent, data) => {
  const element = document.createElement(data.tag);
  // class
  // data.class = 'cosas separadas';
  // data.class.split(' '); // ['cosas', 'separadas']
  if (data.class !== undefined) {
    element.classList.add(...data.class.split(' '));
  }
  parent.appendChild(element);
  // attributes
  Object.assign(element, data.attributes);
  // data set
  if (data.dataset !== undefined) {
    // for (const item in data.dataset) {
    //   element.setAttribute('data-' + item, data.dataset[item]);
    // }
    Object.assign(element.dataset, data.dataset);
  }
  // text
  if (data.text !== undefined) {
    const textEl = document.createTextNode(data.text);
    element.appendChild(textEl);
  }
  return element;
};

export default {
  appendElement,
};
