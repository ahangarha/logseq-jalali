import '@logseq/libs';

const graphDocument = window.parent.document;

const addJalaliDateIfPossible = (element) => {
  const text = element.textContent;
  if (!/^\w+ \d+\w{2}, \d{4}$/.test(text)) return;

  const textInDateFormat = text.match(/^(\w+ \d+)\w{2}(, \d{4})$/).slice(1, 3).join('');
  const jalaliDate = new Date(textInDateFormat).toLocaleString('fa', { dateStyle: 'short' });

  if (jalaliDate === 'Invalid Date') return;

  const jalaliDateElement = document.createElement('span');
  jalaliDateElement.style = 'font-size: .66em; opacity: .3; padding-inline-start: 1em;';
  jalaliDateElement.textContent = jalaliDate;

  element.appendChild(jalaliDateElement);
};

const addJalaliDateIfPossibleToAll = (nodes) => {
  nodes.forEach((node) => addJalaliDateIfPossible(node));
};

const watchForJalaliUpdate = () => {
  const cssSelector = 'a.journal-title h1.title, h1.page-title .title';

  // initial run on whole document
  addJalaliDateIfPossibleToAll(graphDocument.querySelectorAll(cssSelector));

  // Define the callback function
  const processBlocks = () => {
    addJalaliDateIfPossibleToAll(graphDocument.querySelectorAll(cssSelector));
  };

  const observer = new MutationObserver(processBlocks);
  observer.observe(graphDocument, {
    attributes: false,
    childList: true,
    subtree: true,
  });
};

const main = () => {
  watchForJalaliUpdate();
};

// eslint-disable-next-line no-undef, no-console
logseq.ready(main).catch(console.error);
