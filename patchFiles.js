const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// 解决 node_modules 修改源码，导致重新装包而要手动替换源码的重复操作。
// 将 other_modules 内的文件覆盖真正的 node_modules
const REAL_NODE_MODULES = path.resolve('./node_modules'); // 旧node_modules
const MY_NODE_MODULES = path.resolve('other_modules'); // 新node_modules

// 复制目录和文件
function copy(origin, target, filterFn = () => true) {
    try {
        const stats = fs.statSync(origin);
        if (stats.isDirectory()) {
            // 如果目标目录不存在，则创建它
            if (!fs.existsSync(target)) {
                fs.mkdirSync(target, { recursive: true }); // 使用recursive选项确保所有父目录都被创建
            }

            // 递归复制子目录和文件
            fs.readdirSync(origin).forEach(originName => {
                const originFilePath = path.resolve(origin, originName);
                const targetFilePath = path.resolve(target, originName);
                copy(originFilePath, targetFilePath, filterFn);
            });
        } else if (filterFn(origin, target)) {
            console.info(chalk.blue(`已被覆盖的文件：${target}`));
            fs.copyFileSync(origin, target);
        }
    } catch (error) {
        console.error(chalk.red(`复制失败：${error.message}`));
    }
}

// 调用copy函数
copy(MY_NODE_MODULES, REAL_NODE_MODULES);

console.info(chalk.bold.yellow('💡💡💡 以上的文件已被other_modules中的文件替换，升级版本后请注意检查！！！'));