/**
 * 段前段后间距插件
 * @file
 * @since 1.2.6.1
 */

/**
 * 设置段间距
 * @command duiqi
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { String } value 段间距的值，以px为单位
 * @param { String } dir 间距位置，top或bottom，分别表示段前和段后
 * @example
 * ```javascript
 * editor.execCommand( 'duiqi', '10', 'top' );
 * ```
 */

UE.plugins["duiqi"] = function() {
  var me = this;
  me.setOpt({
    duiqitop: ["5", "10", "15", "20", "25"],
    duiqibottom: ["5", "10", "15", "20", "25"]
  });
  me.commands["duiqi"] = {
    execCommand: function(cmdName, value, dir) {
      this.execCommand("paragraph", "p", {
        style: "margin-" + dir + ":" + value + "px"
      });
      return true;
    },
    queryCommandValue: function(cmdName, dir) {
      var pN = domUtils.filterNodeList(
        this.selection.getStartElementPath(),
        function(node) {
          return domUtils.isBlockElm(node);
        }
      ),
        value;
      //trace:1026
      if (pN) {
        value = domUtils
          .getComputedStyle(pN, "margin-" + dir)
          .replace(/[^\d]/g, "");
        return !value ? 0 : value;
      }
      return 0;
    }
  };
};
