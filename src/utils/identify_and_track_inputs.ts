const monitoredElements: Set<HTMLElement> = new Set();
let userTextForAnalysis: string = "";
let debounceTimer: number | NodeJS.Timeout | null = 2000;

function observerCallback(mutations: MutationRecord[]): void {
  for (const mutation of mutations) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      scanAndMonitorNodes(mutation.addedNodes);
    }
  }
}

function scanAndMonitorNodes(nodes: NodeList | HTMLCollection): void {
  const universalSelectors = [
    '[contenteditable="true"]',
    '[role="textbox"]',
    'input[type="text"]',
    "textarea",
    "form",
    "span",
    "div",
  ];

  for (const node of nodes) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      if (element.matches(universalSelectors.join(", "))) {
        attachInputMonitor(element);
      }
      const children = element.querySelectorAll(universalSelectors.join(", "));
      children.forEach((child) => {
        attachInputMonitor(child as HTMLElement);
      });
    }
  }

  // console.log(
  //   `[Monitor] Found and initialized ${monitoredElements.size} input elements.`
  // );
}

function attachInputMonitor(element: HTMLElement): void {
  if (monitoredElements.has(element)) {
    // console.log("Already monitoring this element:", element);
  } else {
    const inputHandler = (event: Event) => {
      const target = event.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLElement;
      userTextForAnalysis = target.textContent;
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        console.log(
          `[Input Monitor] User input detected in element:`,
          userTextForAnalysis
        );
      }, 2000);
    };
    element.addEventListener("input", inputHandler);
    monitoredElements.add(element);
    // console.log(`[Input Monitor] Attached input listener to element:`, element);
  }
}

export const identifyAndTrackInputs = (): void => {
  const observer = new MutationObserver(observerCallback);
  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
};
