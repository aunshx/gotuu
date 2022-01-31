const switchMonth = (ele) => {
    let j = {};
    switch (ele.date.date) {
      case "01":
        j = {
          name: "Jan",
          value: ele.count,
        };
        break;
      case "02":
        j = {
          name: "Feb",
          value: ele.count,
        };
        break;
      case "03":
        j = {
          name: "Mar",
          value: ele.count,
        };
        break;
      case "04":
        j = {
          name: "Apr",
          value: ele.count,
        };
        break;
      case "05":
        j = {
          name: "May",
          value: ele.count,
        };
        break;
      case "06":
        j = {
          name: "Jun",
          value: ele.count,
        };
        break;
      case "07":
        j = {
          name: "Jul",
          value: ele.count,
        };
        break;
      case "08":
        j = {
          name: "Aug",
          value: ele.count,
        };
        break;
      case "09":
        j = {
          name: "Sep",
          value: ele.count,
        };
        break;
      case "10":
        j = {
          name: "Oct",
          value: ele.count,
        };
        break;
      case "11":
        j = {
          name: "Nov",
          value: ele.count,
        };
        break;
      case "12":
        j = {
          name: "Dec",
          value: ele.count,
        };
        break;

      default:
        j={}
    }
    return j
}

export default switchMonth