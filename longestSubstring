// Sliding Window approach - O(n) time complexity, in the worst case each character would be visited twice, once by i and once by j - Space complexity is dictated by the size of the Set used.

function lengthOfLongestSubstring(str) {
    const len = str.length;
    var set = new Set(),
        ans = 0,
        i = 0,
        j = 0;
    while(i < len && j < len) {
        if(!set.has(str[j])) {
            set.add(str[j++]);
            ans = Math.max(ans, j-i);
        } else {
            set.delete(str[i++]);
        }
    }
    return ans;
}

// Brute force approach - O(n3) time complexity - Space complexity dictated by size of the Set used.

function allUnique(str) {
    let charSet = new Set(str);
    return charSet.size === str.length;
}

function lengthOfLongestSubstring(str) {
    const len = str.length;
    var ans = 0;
    
    for(var i = 0; i < len; i++) {
        for(var j = i + 1; j <= len; j++) {
            var substring = str.slice(i, j+1);
            if (allUnique(substring)) {
                ans = Math.max(ans, substring.length);
            }
        }
    }
  return ans;
}
