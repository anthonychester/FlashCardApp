import { Text, View } from "react-native";
import { mdInterperter } from "../mdinterpreter/main";

import { cardStyles } from "./cardStyles"


export const BLANK = "\u001F"; //INFORMATION SEPARATOR ONE

export interface headers {
  name: string;
  count: number;
  group4: number;
  group3: number;
  group2: number;
  group1: number;
  path: string;
}

export function makeHeaders(name: string, count: number, group1: number, group2: number, group3: number, group4: number): string {
    let name_alo = "[" + name + BLANK.repeat(32-name.length) + "]";
    let count_alo = "[" + count + BLANK.repeat(8-count.toString().length) + "]";
    let group1_alo = "[" + group1 + BLANK.repeat(8-group1.toString().length) + "]";
    let group2_alo = "[" + group2 + BLANK.repeat(8-group2.toString().length) + "]";
    let group3_alo = "[" + group3 + BLANK.repeat(8-group3.toString().length) + "]";
    let group4_alo = "[" + group4 + BLANK.repeat(8-group4.toString().length) + "]";
  
    let file_cont = (name_alo + "\n") + (count_alo + "\n") + (group1_alo + "\n") + (group2_alo + "\n") + (group3_alo + "\n") + (group4_alo + "\n") +"\n";
    return file_cont;
  }

export function getHeaderData(str: string): headers {
  let data = str.replaceAll(BLANK, "").split("\n");
  let done = [];
  for(let i=0;i<data.length-1;i++) { //last entery is \n
    let row = data[i];
    let s = row.indexOf("[") + 1;
    let e = row.lastIndexOf("]")
    done.push(row.slice(s,e));
  }
  //console.log(done, data.length);
  return {
    name: done[0],
  count: Number(done[1]),
  group4: Number(done[2]),
  group3: Number(done[3]),
  group2: Number(done[4]),
  group1: Number(done[5]),
  path: ""
  };
}

export function makeMarkdown(text: any): any {
  let mdi =  new mdInterperter(text);
  mdi.parse();
  let out = [];
  let temp = [];
  for(let i=0; i<mdi.style.length;i++) {
    //console.log("s", mdi.style);
    if(mdi.style[i][0] == "nl") {
      out.push(<View style={{flexDirection: 'row'}} key={out.length}>{temp}</View>);
      temp = [];
    } else {
    let curStyles: any[] = [];
    for(let ii=0;ii<mdi.style[i].length;ii++) {
      
      //@ts-ignore
      curStyles.push(cardStyles[mdi.style[i][ii]]); //mdi.style[i][ii]
    }
    if(curStyles.length == 0) {
      //@ts-ignore
      curStyles.push(cardStyles.d);
    }
      temp.push(<Text style={curStyles} key={i}>{mdi.text[i]}</Text>)
    }
  }

  if(temp.length > 0) {
    out.push(<View style={{flexDirection: 'row'}} key={out.length}>{temp}</View>);
    temp = [];
  }
  return out;
}