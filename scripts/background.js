// Listener to handle toolbar icon clicks and open the sidebar
browser.action.onClicked.addListener(() => {
  browser.sidebarAction.open();
});
