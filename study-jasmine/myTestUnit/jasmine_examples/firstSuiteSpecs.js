const { 
  browserHasPromises, 
  soon, 
  browserHasAsyncAwaitSupport 
} = require("../../lib/utils")

describe("A suite", function() {
  it('contains spec with an expectation', function() {
    expect(true).toBe(true)
  });
})


describe("A suite is just a function", function() {
  var a;
  it('and so is a spec', function() {
    a = true;
    expect(a).toBe(true);
  });
})


describe("The 'toBe' matcher compares width ===", function() {
  it('and has a positive case', function() {
    expect(true).toBe(true)
  });

  it('and can have a negative case', function() {
    expect(false).not.toBe(true)
  });
})


describe("A suite with some shared setup", function() {
  var foo = 0;

  /** 
   * beforeEach 与 afterEach 不仅会在当前 describe 的 it 中执行，
   * 还会在当前 describe 中嵌套的 describe it 中执行。
   */
  beforeEach( function() {
    foo += 1;
  })

  afterEach( function() {
    foo = 0;
  })

  beforeAll( function() {
    foo = 1;
  })

  afterAll( function() {
    foo = 0;
  })
})


describe("A spec", function() {
  /**
   * 可以通过在 beforeEach/afterEach 中的 this 指针来共享变量
   */
  beforeEach( function() {
    this.foo = 0;
  })

  it('can use the `this` to share state', function() {
    expect(this.foo).toEqual(0);
    this.bar = "test pollution?"
  });

  /**
   * it 中定义的 `this` 在别的 it 中是不能共享的，但是都可以访问 beforeEach/afterEach 中的 `this`
   */
  it('prevents test pollution by having an empty `this` created for the next spec', function() {
    expect(this.foo).toEqual(0);
    expect(this.bar).toBe(undefined)
  });
})


describe("A spec using the fail function", function() {
  var foo = (x, callBack) => {
    if (x) {
      callBack();
    }
  }
  /**
   * fail 函数可以抛出一个错误
   */
  it('should not call the callBack', function() {
    foo(false, function() {
      fail("CallBack has been called")
    })
  });
})

/**
 * beforeEach/afterEach 可以穿透后代 describe， 在后代 describe 的 it 执行之前/之后执行。
 */
describe('A spec', function() {
  var foo;

  beforeEach( function() {
    foo = 1;
  })

  afterEach( function() {
    foo = 0;
  })
  
  it('is just a function, so it can contain any code', function() {
    expect(foo).toEqual(1)
  });

  it('can have more than one expectation', function() {
    expect(foo).toEqual(1)
    expect(true).toEqual(true)
  });
    
  describe('nested inside a second describe', function() {
    var bar;
    beforeEach( function() {
      bar = 1;
    })

    it('can reference both scopes as needed', function() {
      expect(foo).toEqual(bar)
    });      
  });
});
  

/**
 * xdescribe 在执行 suites 时会自动跳过。
 * xdescribe 中的所有 it 都会在执行结果中标记为 Pending 状态。
 */
xdescribe('A spec', function() {
  var foo;

  beforeEach(function() {
    foo = 0;
    foo += 1;
  })

  it("is just a function, so it can contain any code", function() {
    console.log("this is xdescribe")
    expect(foo).toEqual(1)
  })
});


/**
 * 想在 describe 中将 it 跳过，有如下 3 种方式。
 */
describe('Pending specs', function() {
  xit("can be declared 'xit'", function() {
    expect(true).toBe(false)
  })
  
  it('can be declared with "it" bu without a function');

  
  it('can be declared by calling "pending" in the spec body', function() {
    expect(true).toBe(false)
    pending("this is why it is pending")
  });    
    
});

/**
 * spy 可以追踪任何 function 的调用和参数
 * spy 只能定义在 describe/it 内部
 * spy 会在每个 it 执行完毕后销毁
 * spy 会阻止 function 的实际执行，指挥追踪他的调用状态。也就是说被 spy 的 function 永远会不会真的执行
 */
describe('A spy', function() {
  var foo, bar = null;
  
  beforeEach(function() {
    foo = {
      setBar: function (value) {
        bar = value
        console.log("bar::: ", value)
      }
    }
    // 定义一个spy, 追踪 foo 对象中的 setBar 方法
    spyOn(foo, 'setBar')
  
    foo.setBar(123)
    foo.setBar(456, "another param")

  })

  
  it('tracks that the spy war called', function() {
    expect(foo.setBar).toHaveBeenCalled();
  });

  
  it('tracks that the spy was called x times', function() {
    expect(foo.setBar).toHaveBeenCalledTimes(2)
  });
    
  
  it('tracks all the arguments of its calls', function() {
    expect(foo.setBar).toHaveBeenCalledWith(456, "another param")
    expect(foo.setBar).toHaveBeenCalledWith(123)
  });
  
  it('stops all execution on a function', function() {
    expect(bar).toBeNull()    
  });
  
  /**
   * calls 会追踪被 spy 的 function 的全部调用信息(包括历史数据)
   * 具体用法参考：https://jasmine.github.io/api/edge/Spy_calls.html
   */
  it('track if it was called at all', function() {
    foo.setBar("hello world");
    /**
     * all() → {Array.<Spy.callData>}
     * Get the raw calls array for this spy.
     */
    console.log("\n all():::", foo.setBar.calls.all()) 
    /**
     * allArgs() → {Array}
     * Get all of the arguments for each invocation of this spy in the order they were received.
     */
    console.log("\n allArgs():::", foo.setBar.calls.allArgs())
    /**
     * any() → {Boolean}
     * Check whether this spy has been invoked.
     */
    console.log("\n any():::", foo.setBar.calls.any()) 
    expect(foo.setBar.calls.any()).toBe(true)
  });   
});


describe('A spy, when created manually', function() {
  var whatAmI;

  beforeEach(function() {
    whatAmI = jasmine.createSpy("whatAmI")

    whatAmI("I", "am", "a", "spy")
  })
  
  it('tracks that the spy was called', function() {
    expect(whatAmI).toHaveBeenCalled();
  });
});
  

describe('Mutiple spies, when created manually', function() {
  var tape;

  beforeEach(function() {
    tape = jasmine.createSpyObj("tape", ['play', 'pause', 'stop', 'rewind'])

    tape.play()
    tape.pause()
    tape.rewind(0)
  })

  
  it('creates spies for each requested function', function() {
    expect(tape.play).toBeDefined()
    expect(tape.pause).toBeDefined()
    expect(tape.stop).toBeDefined()
    expect(tape.rewind).toBeDefined()
  });
});
  
/**
 * 使用 any/anything, 类似于模糊类型判断
 */
describe('Matching with finesse', function() {
  
  describe('jasmine.any', function() {
    it("matches any value", function() {
      expect({}).toEqual(jasmine.any(Object))
      expect(12).toEqual(jasmine.any(Number))
    })   

    describe('when used with a spy', function() {      
      it('is useful for comparing arguments', function() {
        var foo = jasmine.createSpy("foo")
        foo(12, function() {
          return true
        })
        expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function))
      });
    });
    
    describe('jasmine.anything', function() {      
      it('matches anything', function() {
        expect(1).toEqual(jasmine.anything())
      });      
      describe('when used with a spy', function() {        
        it('is useful when the argument can be ignored', function() {
          var foo = jasmine.createSpy("foo")
          foo(12, function() {
            return false
          })
          expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.anything())
          expect(foo).toHaveBeenCalledWith(12, jasmine.anything())
        });          
      });
    });
  });
});
  
/** 判断一个对象内是否包含指定内容 */
describe('jasmine.objectContaining', function() {
  var foo;
  beforeEach(function() {
    foo = {
      a: 1,
      b: 2,
      bar: 'baz'
    }
  })
  
  it('matches objects with the expect key/value pairs', function() {
    expect(foo).toEqual(jasmine.objectContaining({
      bar: 'baz'
    }))
    expect(foo).not.toEqual(jasmine.objectContaining({
      c: 37
    }))
  });
  
  describe('when used with a spy', function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy('callback')

      callback({
        bar: 'baz'
      })
      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
        bar: 'baz'
      }))
    })
  });
});
  

describe('jasmine.arrayContaining', function() {
  var foo;
  beforeEach(function() {
    foo = [1, 2, 3, 4]
  })
  
  it('matches arrays with some of the values', function() {
    expect(foo).toEqual(jasmine.arrayContaining([3, 1])) //使用 toBe 会报错
    expect(foo).not.toEqual(jasmine.arrayContaining([10]))
  });
  
  describe('when used with a spy', function() {
    it("is useful when comparing arguments", function() {
      var callback = jasmine.createSpy("callback")
      callback([1,2,3,4])
      expect(callback).toHaveBeenCalledWith(jasmine.arrayContaining([1,2,3]))
      expect(callback).not.toHaveBeenCalledWith(jasmine.arrayContaining([7,3]))
    })
  });
});
  
/** 可以在 jasmine.stringMatching 中，既可以用字符串进行匹配，也可以用正则进行字符串匹配 */
describe('jasmine.stringMatching', function() {
  it("matches as a regexp", function() {
    expect({foo: 'bar'}).toEqual( {foo: jasmine.stringMatching(/^bar$/)} )
    expect( {foo: 'foobarbaz'} ).toEqual( {foo: jasmine.stringMatching('bar')} )
  })
  
  describe('when used with a spy', function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy("callback")
      callback("foobarbaz")
      expect(callback).toHaveBeenCalledWith(jasmine.stringMatching('bar'))
      expect(callback).not.toHaveBeenCalledWith(jasmine.stringMatching(/shenxin/))
      expect(callback).toHaveBeenCalledWith("foobarbaz")
    })
  });
    
});

/**
 * asymmeticMatch 可以自定义一个匹配规则
 */
describe('custom asymmetry', function() {
  var tester = {
    asymmetricMatch: function(actual) {
      var secondValue = actual.split(',')[1]
      return secondValue === 'bar'
    }
  }
  
  it('dives in deep', function() {
    expect("foo,bar,baz,quux").toEqual(tester)
  });

  
  describe('when used with a spy', function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy("callback")
      callback("foo,bar,baz")

      expect(callback).toHaveBeenCalledWith(tester)
    })
  });   
});
  

/**
 * jasmine.clock() 用于测试需要依赖执行时间的测试用例
 * 开启计时：jasmine.clock().install()
 * 停止计时: jasmine.clock().uninstall()
 * sleep程序： jasmine.clock().tick(time)
 * 模拟指定日期： jasmine.clock().mockDate(new Date(2013,9,13))
 */
describe('Manually ticking the jasmine Clock', function() {
  var timerCallback;

  beforeEach(function() {
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  })
  afterEach(function() {
    jasmine.clock().uninstall();
  })

  it('causes a interval to be called synchronously', function() {
    setInterval(function() {
      timerCallback()
    }, 100)

    expect(timerCallback).not.toHaveBeenCalled()
    jasmine.clock().tick(101);
    expect(timerCallback.calls.count()).toEqual(1)

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(1)

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(2)
  });

  
  describe('Mocking the Date object', function() {
    
    it('mocks the Date object and sets it to a given time', function() {
      var baseTime = new Date(2013,9,23)
      jasmine.clock().mockDate(baseTime)
      jasmine.clock().tick(50)
      expect(new Date().getTime()).toEqual(baseTime.getTime() + 50)
    });
      
  });   
    
});


describe('Asynchronous specs', function() {
  var value;
  
  describe("Using callbacks", function() {
    beforeEach(function(done) {
      setTimeout(function() {
        value = 0;
        done();
      },1)
    })
    
    it('should support async execution of test preparation and expectations', function(done) {
      value++;
      expect(value).toBeGreaterThan(0)
      done()
    });

    
    describe('A spec using done.fail', function() {
      var foo = function(x, callback1, callback2) {
        if (x) {
          setTimeout(callback1, 0)
        } else {
          setTimeout(callback2, 0)
        }
      }
      
      it('should not call the second callback', function(done) {
        foo(
          true,
          done,
          function() {
            done.fail("Second callback has been called")
          })
      });
        
    });
      
      
  })
});


describe('Using Promises', function() {
  if (!browserHasPromises()) {
    console.log(browserHasPromises())
    return;
  }
  beforeEach( function() {
    return soon().then( () => {
      value = 0;
    })
  })
  
  it('should execute Promise correctly', function() {
    return soon().then( () => {
      value++
      expect(value).toBeGreaterThan(0)
    })
  }); 
});


describe('Using async/await', function() {
  if (!browserHasAsyncAwaitSupport()) {
    return;
  }

  beforeEach(async function() {
    await soon();
    value = 0
  })
  
  it('should support async execution of test preparation and expectations', async function() {
    await soon();
    value++;
    expect(value).toBeGreaterThan(0)
  });      
});


/**
 * jasmine 处理异步方法时，默认最长等待 5s，超时则会用 fail 抛出一个超时错误。
 * 若需要处理超过 5s 的异步方法，则需要在 it 中手动传入超时时间。
 * 只要在传入的超时时间范围内手动调用 done 函数即可
 */
// describe('long asynchronous specs', function() {
//   beforeEach( function(done) {
//     done()
//   }, 1000)    // 传入超时时间 1000ms

//   it('takes a long time', function(done) {
//     setTimeout( () => {
//       done()
//     }, 9000)
//   }, 10000);

//   afterEach(function(done) {
//     done()
//   }, 1000)
    
// });
  
  