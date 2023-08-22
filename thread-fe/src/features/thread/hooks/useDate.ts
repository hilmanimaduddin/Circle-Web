// function getDistanceTime() {
//   let timeNow = new Date();
//   let timePost = time;

//   let distance = timeNow - timePost;
//   console.log(distance);

//   let distanceDay = Math.floor(distance / (1000 * 60 * 60 * 24));
//   let distanceHour = Math.floor(distance / (1000 * 60 * 60));
//   let distanceMinute = Math.floor(distance / (1000 * 60));
//   //   let distanceSecond = Math.floor(distance / 1000);

//   if (distanceDay > 0) {
//     return `${distanceDay} Day ago`;
//   } else if (distanceHour > 0) {
//     return `${distanceHour} Hour ago`;
//   } else if (distanceMinute > 0) {
//     return `${distanceMinute} Minute ago`;
//   } else {
//     // return `${distanceSecond} Second ago`;
//     return `less than a minute`;
//   }
// }

//   setInterval(function () {
//     rendercobaa();
//   }, 5000);

import { ThreadCardType } from "../../../types/interface/IType";

// export const useDate = (props: ThreadCardType) => {
export function useDate(props: ThreadCardType) {
  function getDistanceTime() {
    let t = new Date();
    let timeNow = t.getTime() as number;
    console.log(timeNow);

    let timePost = new Date(props.posted_at as Date);
    // let timePost = props.posted_at as number;
    let waktu = timePost.getTime() as number;
    console.log(timePost);

    let distance = timeNow - waktu;
    console.log(distance);

    let distanceDay = Math.floor(distance / (1000 * 60 * 60 * 24));
    let distanceHour = Math.floor(distance / (1000 * 60 * 60));
    let distanceMinute = Math.floor(distance / (1000 * 60));
    //   let distanceSecond = Math.floor(distance / 1000);

    if (distanceDay > 0) {
      return `${distanceDay} Day ago`;
    } else if (distanceHour > 0) {
      return `${distanceHour} Hour ago`;
    } else if (distanceMinute > 0) {
      return `${distanceMinute} Minute ago`;
    } else {
      // return `${distanceSecond} Second ago`;
      return `less than a minute`;
    }
  }
  return getDistanceTime();
}
