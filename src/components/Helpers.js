export default {
  generateUUID () {
    let d = new Date().getTime()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
    })
    return uuid
  },
  moveItem (items, old_index,new_index) {
    if(items == undefined || old_index == undefined || new_index == undefined)
    if(
      old_index >= 0 && 
      old_index < items.length &&
      new_index >= 0 &&
      new_index < items.length 
      ) {
        items.splice(new_index, 0, items.splice(old_index, 1)[0])
    }
    return true
  }
}

