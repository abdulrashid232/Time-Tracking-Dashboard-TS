export const daily = document.querySelector(".daily") as HTMLElement;
export const weekly = document.querySelector(".weekly") as HTMLElement;
export const monthly = document.querySelector(".monthly") as HTMLElement;

import { jsonData } from "./main.ts";

export function DailyFunction(): void {
  daily.classList.add('active');
  monthly.classList.remove('active');
  weekly.classList.remove('active');

  const contentContainers = document.querySelectorAll(".main-activity .content") as NodeListOf<HTMLElement>;

  jsonData.forEach((item, index) => {
    contentContainers[index].innerHTML = `<h3>${item.timeframes.daily.current + 'hrs'} </h3> 
          <p>${'Yesterday - ' + item.timeframes.daily.previous + 'hrs'} </p>`;
  });
}

export function WeeklyFunction(): void {
  daily.classList.remove('active');
  monthly.classList.remove('active');
  weekly.classList.add('active');

  const contentContainers = document.querySelectorAll(".main-activity .content") as NodeListOf<HTMLElement>;

  jsonData.forEach((item, index) => {
    contentContainers[index].innerHTML = `<h3>${item.timeframes.weekly.current + 'hrs'} </h3> 
          <p>${'Last Week - ' + item.timeframes.weekly.previous + 'hrs'} </p>`;
  });
}

export function MonthlyFunction(): void {
  daily.classList.remove('active');
  monthly.classList.add('active');
  weekly.classList.remove('active');

  const contentContainers = document.querySelectorAll(".main-activity .content") as NodeListOf<HTMLElement>;

  jsonData.forEach((item, index) => {
    contentContainers[index].innerHTML = `<h3>${item.timeframes.monthly.current + 'hrs'} </h3> 
          <p>${'Last Month - ' + item.timeframes.monthly.previous + 'hrs'} </p>`;
  });
}
