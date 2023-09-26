export const getCookie = (cookieName) => {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }  
    return null;
}

export const setCookie = (name, value, daysToExpire) => {
  const date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export const getBalances = (expenses, userId) => {
    const userBalances = new Map();
    expenses.forEach((expense) => {
      const { payerId, participants } = expense;  
      if (payerId === userId) {
        for (const participantId in participants) {
          if (participantId !== userId) {
            const owedAmount = participants[participantId];
            const currentBalance = userBalances.get(participantId) || 0;
            userBalances.set(participantId, currentBalance + owedAmount);
          }
        }
      } else if (participants[userId]) {
        const owedAmount = participants[userId];
        const currentBalance = userBalances.get(payerId) || 0;
        userBalances.set(payerId, currentBalance - owedAmount);
      }
    });
  
    return userBalances;
}
