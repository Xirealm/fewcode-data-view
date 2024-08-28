// /@/utils/formatTime.ts

// 格式化日期时间的函数
export function parseDateTime(dateTime: string): string {
    // 示例的日期时间格式化逻辑（根据需要调整）
    const date = new Date(dateTime);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    return `${formattedDate} ${formattedTime}`;
}