# Shared worker survive page refresh test

Shared worker has a variable `connectionCount`. 
If it keep increasing when you refresh the page, it means the shared worker survived page refresh.
Because if shared worker didn't survive page refresh, `connectionCount` would be reset to 0.


## Conclusion

There is no easy way.
