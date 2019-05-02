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

// Expand around the center character

const expandAroundCenter = function(str, indexOne, indexTwo) {
    const len = str.length;
    var start = indexOne,
        end = indexTwo;
    
    while(str[start] === str[end] && start >= 0 && end <= len - 1) {
        start--;
        end++;
    }
    return str.substring(start + 1, end);
};
    
var longestPalindrome = function(str) {
    const len = str.length;
    let longest = "";
    if (str === null || len < 1) return longest;
    
    for(var i = 0; i < len; i++) {
        let tempSubstring = expandAroundCenter(str, i, i);
        if (tempSubstring.length > longest.length) {
            longest = tempSubstring;
        }
        tempSubstring = expandAroundCenter(str, i, i+1);
        if (tempSubstring.length > longest.length) {
            longest = tempSubstring;
        }
    }
    return longest;
};

// simple is Palindrome

const isPalindrome = (str) => {
   return str === str.split('').reverse().join('');
};
