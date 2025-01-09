(function (window) {
    // 调用选项卡
    tab();
})(window);

function tab() {
  // 获取选项卡头部的列表项和选项卡内容的div元素
  const tabHeaderItems = document.querySelectorAll('#tab_header li');
  const tabContentDivs = document.querySelectorAll('#tab_content .dom');

  // 给每个选项卡头部的列表项添加点击事件监听器
  tabHeaderItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // 移除所有选项卡头部列表项的"current"类
      tabHeaderItems.forEach((item) => {
        item.classList.remove('current');
      });

      // 隐藏所有选项卡内容的div
      tabContentDivs.forEach((div) => {
        div.classList.remove('active');
      });

      // 添加"current"类到当前点击的列表项
      item.classList.add('current');

      // 显示对应索引的选项卡内容div
      tabContentDivs[index].classList.add('active');
    });
  });
}
