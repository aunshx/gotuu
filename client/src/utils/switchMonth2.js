export const switchMonth2Min = (ele) => {
  let j = {};
  switch (ele.date.date) {
    case "01":
      j = {
        name: "Jan",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "02":
      j = {
        name: "Feb",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "03":
      j = {
        name: "Mar",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "04":
      j = {
        name: "Apr",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "05":
      j = {
        name: "May",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "06":
      j = {
        name: "Jun",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "07":
      j = {
        name: "Jul",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "08":
      j = {
        name: "Aug",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "09":
      j = {
        name: "Sep",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "10":
      j = {
        name: "Oct",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "11":
      j = {
        name: "Nov",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;
    case "12":
      j = {
        name: "Dec",
        value: (ele.sum / 6000).toFixed("0"),
      };
      break;

    default:
      j = {};
  }
  return j;
};

export const switchMonth2Hrs = (ele) => {
  let j = {};
  switch (ele.date.date) {
    case "01":
      j = {
        name: "Jan",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "02":
      j = {
        name: "Feb",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "03":
      j = {
        name: "Mar",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "04":
      j = {
        name: "Apr",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "05":
      j = {
        name: "May",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "06":
      j = {
        name: "Jun",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "07":
      j = {
        name: "Jul",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "08":
      j = {
        name: "Aug",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "09":
      j = {
        name: "Sep",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "10":
      j = {
        name: "Oct",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "11":
      j = {
        name: "Nov",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;
    case "12":
      j = {
        name: "Dec",
        value: (ele.sum / 360000).toFixed("1"),
      };
      break;

    default:
      j = {};
  }
  return j;
};
