export function add(count){
  return {
    type:"ADD",
    count
  }
}

export function rename(name){
  return {
    type:"RENAME",
    name
  }
}