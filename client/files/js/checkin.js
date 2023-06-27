document.addEventListener('DOMContentLoaded', () => {
  checkinTbl = document.querySelector('#list-checkin__body');
  moment.locale('vi');
  renderCheckin();
});

let checkinTbl;

const renderCheckin = async () => {
  await checkUserInfo(accessToken);
  try {
    const classId = localStore.getItem('classId');
    if (!classId && !window.location.href.includes('checkin.html'))
      return window.location.replace('./index.html');
    const result = (await getData(accessToken, `check-in?classId=${classId}`))
        .data,
      detailClass = (await getData(accessToken, `class/${classId}`)).data;
    if (!result?.state) return window.location.replace('./index.html');
    try {
      const { listCheckin } = result;
      checkinTbl.innerHTML = '';
      listCheckin.forEach(({ createdAt, user }, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${++index}</td>
            <td>${user?.fullname || user?.username}</td>
            <td>${moment(createdAt).format(
              'dddd, MMMM Do YYYY, h:mm:ss a'
            )}</td>
            <td>${detailClass?.name}</td>
            `;
        checkinTbl.append(tr);
      });
    } catch (error) {
      console.log(error);
      //   return window.location.replace('./index.html');
    }
    console.log(result);
  } catch (error) {
    console.log(error);
    // return window.location.replace('./index.html');
  }
};
