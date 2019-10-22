export function add(count:number){
  return {
    type:"ADD",
    count
  }
}

export function rename(name:string){
  return {
    type:"RENAME",
    name
  }
}