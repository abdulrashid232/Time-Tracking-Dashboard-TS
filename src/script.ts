interface Timeframes {
  daily: {
    current: string;
    previous: string;
  };
  weekly: {
    current: string;
    previous: string;
  };
  monthly: {
    current: string;
    previous: string;
  };
}

interface Activity {
  title: string;
  timeframes: Timeframes;
}

let daily = document.querySelector(".daily") as HTMLElement;
let weekly = document.querySelector(".weekly") as HTMLElement;
let monthly = document.querySelector(".monthly") as HTMLElement;

let jsonData: Activity[];

fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data: Activity[]) => {
    jsonData = data;
    generateActivitiesHTML(jsonData);
    daily.addEventListener('click', DailyFunction);
    weekly.addEventListener('click', WeeklyFunction);
    monthly.addEventListener('click', MonthlyFunction);
    window.onload = DailyFunction;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

function DailyFunction() {
  daily.classList.add('active');
  monthly.classList.remove('active');
  weekly.classList.remove('active');

  let contentContainers = document.querySelectorAll(".main-activity .content") as NodeListOf<HTMLElement>;

  jsonData.forEach((item, index) => {
    contentContainers[index].innerHTML = `<h3>${item.timeframes.daily.current + 'hrs'} </h3> 
            <p>${'Yesterday - ' + item.timeframes.daily.previous + 'hrs'} </p>`;
  });
}

function WeeklyFunction() {
  daily.classList.remove('active');
  monthly.classList.remove('active');
  weekly.classList.add('active');

  let contentContainers = document.querySelectorAll(".main-activity .content") as NodeListOf<HTMLElement>;
  jsonData.forEach((item, index) => {
    contentContainers[index].innerHTML = `<h3>${item.timeframes.weekly.current + 'hrs'} </h3> 
            <p>${'Last Week - ' + item.timeframes.weekly.previous + 'hrs'} </p>`;
  });
}

function MonthlyFunction() {
  daily.classList.remove('active');
  monthly.classList.add('active');
  weekly.classList.remove('active');

  let contentContainers = document.querySelectorAll(".main-activity .content") as NodeListOf<HTMLElement>;

  jsonData.forEach((item, index) => {
    contentContainers[index].innerHTML = `<h3>${item.timeframes.monthly.current + 'hrs'} </h3> 
          <p>${'Last Month - ' + item.timeframes.monthly.previous + 'hrs'} </p>`;
  });
}

function generateActivitiesHTML(data: Activity[]) {
  let mainActivitiesGrip = document.querySelector(".main-activities-grip") as HTMLElement;

  data.forEach(item => {
    let mainActivity = document.createElement("div");
    mainActivity.classList.add("main-activity", item.title.toLowerCase().replace(/\s+/g, '-'));

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img");
    let img = document.createElement("img");
    img.src = `images/icon-${item.title.toLowerCase().replace(/\s+/g, '-')}.svg`;
    img.alt = item.title;
    imgContainer.appendChild(img);

    let activityContent = document.createElement("div");
    activityContent.classList.add("activity-content");

    let titleContainer = document.createElement("div");
    titleContainer.classList.add("title");
    let title = document.createElement("h4");
    title.textContent = item.title;
    let ellipsisImg = document.createElement("img");
    ellipsisImg.src = "images/icon-ellipsis.svg";
    ellipsisImg.alt = "Ellipsis";
    titleContainer.appendChild(title);
    titleContainer.appendChild(ellipsisImg);

    let contentContainer = document.createElement("div");
    contentContainer.classList.add("content");
    let h3 = document.createElement("h3");
    h3.textContent = "";
    let p = document.createElement("p");
    p.textContent = "";
    contentContainer.appendChild(h3);
    contentContainer.appendChild(p);

    activityContent.appendChild(titleContainer);
    activityContent.appendChild(contentContainer);

    mainActivity.appendChild(imgContainer);
    mainActivity.appendChild(activityContent);

    mainActivitiesGrip.appendChild(mainActivity);
  });
}
