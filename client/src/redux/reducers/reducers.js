const initialState = {
  ui: {
    // These two are UI state for the editor
    // Is the poem prompt loading?
    promptloading: true,
    // Is the current poem long enough to be ended?
    endable: false,

    //This is UI state for the completed poem listing
    // Should the 'load more' button be displayed?
    displayLoadMore: true,
    // How many poems should be loaded the next time the 'load more' button is clicked?
    quantity: 50,
    // Slice the completed poem array from 0 to this number:
    to: 50,
  }
}
