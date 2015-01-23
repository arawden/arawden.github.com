---
class: post
title: Test Post Please Ignore
layout: default
date: 2014-10-11
published: false
summary: Testin shit and stuff
---
#Test Post Please Ignore#
So yea just testing out shit


> And you will know my name is the LORD when i rain fire down upon thee!  
> <cite>[Samuel L. Jackson](http://en.wikipedia.org/wiki/Samuel_L._Jackson)</cite>

Lists!

* Red
* Blue
* Green


1. No
2. Please
3. Ok

Code!
{% highlight ruby linenos%}
#!/usr/bin/env ruby

#this sucks
def prime?(p)
  pri = 1
  until pri > Math::sqrt(p) + 1 do
    if p % pri == 0
      if p != pri && pri != 1
        return false
      end
    end
    pri+=2
  end
  return true
end

def prime_sum(bound)
  sum = 2
  pri = 3
  until pri >= bound
    if prime?(pri)
      sum += pri
    end
    pri += 2
  end
  return sum
end

puts prime_sum(2000000)
{% endhighlight %}

In line code `spans`

Images!  

![Best chart 2014](http://i.imgur.com/CBINkwS.jpg)
