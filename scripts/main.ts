// import { generateActivitiesHTML } from "./card.ts";
import { DailyFunction, WeeklyFunction, MonthlyFunction, daily, weekly, monthly } from "./function_Utils.ts";

let jsonData: any;

fetch('data.json')
  .then((response: Response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data: any) => {
    jsonData = data;
    generateActivitiesHTML(jsonData);
    daily.addEventListener('click', DailyFunction);
    weekly.addEventListener('click', WeeklyFunction);
    monthly.addEventListener('click', MonthlyFunction);
    window.onload = DailyFunction; // Removed the parentheses from onload assignment
  })
  .catch((error: Error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
