// Brute Force

const isPalindrome = function(str) {
   const len = str.length;
   var mid = Math.ceil(len/2),
       end = str.substring(mid),
       start = len%2 === 0 ? str.substring(0,mid) : str.substring(0, mid-1),
       reversedEnd = end.split('').reverse().join('');
    return (start === reversedEnd);
};

var longestPalindrome = function(s) {
    const stringLen = s.length;
    var i = 0,
        ans = "";
    
    for(i; i < stringLen; i++) {
        for(var j = i + 1; j <= stringLen; j++) {
            var substring = s.substring(i, j + 1);
            if (isPalindrome(substring) && substring.length > ans.length) {
                ans = substring;
            }
        }
    }
    return ans;
};
