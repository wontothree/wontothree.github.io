---
title: "[Lboratory] Text LCD 제어"
excerpt: 
categories:
  - laboratory
toc: true
toc_icon: star
share: false
use_math: true
---
## Text LCD 제어

1. Text LCD의 제어 방법을 자세히 이해해야 한다.
2. 스테이트 머신 회로를 이해해야 한다.

Text LCD에 "Hello World"를 출력하자.

1kHz의 clk 입력을 받아 동작하며, rst의 신호에 의해 초기화된다.

### 실험 결과

<img src="../../images/lab/week10/helloworld.jpg">

### 설계 소스 코드

```verilog
module textlcd(rst, clk, lcd_e, lcd_rs, lcd_rw, lcd_data);

input rst, clk;
output lcd_e, lcd_rs, lcd_rw;
output [7:0] lcd_data;

wire lcd_e;
reg lcd_rs, lcd_rw;
reg [7:0] lcd_data;

reg [2:0] state;
parameter delay = 3'b000,
        function_set = 3'b001,
        entry_mode = 3'b010,
        disp_onoff = 3'b011,
        line1 = 3'b100,
        line2 = 3'b101,
        delay_t = 3'b110,
        clear_disp = 3'b111;

integer cnt;
integer cnt_100hz;
reg clk_100hz;
```

- lcd_data는 8비트이다.
- Text LCD를 동작시키기 위한 입/출력 포트 선언
- 로직에서 사용하는 변수 선언
- Text LCD를 동작시키기 위한 State Machine을 parameter로 선언
- integer 변수는 특정한 초기값을 갖지 않은 상태에서 사용되며, 이 변수들은 디바이스의 레지스터나 카운터 등의 역할을 하는 데 주로 사용된다.
- reg는 레지스터를 나타내는 키워드이며, 초기화 없이 사용될 수 있습니다. 초기화되지 않은 경우, 이 변수들은 디바이스의 레지스터 또는 선언된 레지스터 블록 내에서 논리 회로의 역할을 수행하게 됩니다.

||lcd_e|lcd_rs|lcd_rw|
|---|---|---|---|
|설명|LCD에게 데이터를 읽거나 쓸 수 있는 상태를 부여한다.|LCD에 전송되는 것이 데이터인지 명령인지 나타낸다.|데이터를 읽을 것인지 쓸 것인지 나타낸다.|
|0|데이터를 받을 수 있는 상태|LCD에 명령 전송|데이터를 쓰는 상태|
|1|LCD 비활성화 상태|LCD에 데이터 전송|데이터를 읽는 상태|

lcd_data (Data): 표시되는 텍스트나 숫자 데이터

```verilog
always @(posedge rst or posedge clk)
begin
    if (rst)
        begin
        cnt_100hz = 0;  clk_100hz = 1'b0;
        end
    else if (cnt_100hz >= 4)
        begin
        cnt_100hz = 0; clk_100hz = ~clk_100hz;
        end
    else
        cnt_100hz = cnt_100hz + 1;
end
```

- 4kHz 주기의 clk_100hz 신호를 생성할 수 있습니다.(clk는 1kHz)
- 이 신호는 나중에 모듈의 동작을 제어하는 데 사용된다.

```verilog
always@(posedge rst or posedge clk_100hz)
begin
    if (rst)
        state = delay;
    else
        begin
            case (state)
                delay :             if (cnt == 70) state = function_set;
                function_set :      if (cnt == 30) state = disp_onoff;
                disp_onoff :        if (cnt == 30) state = entry_mode;
                entry_mode :        if (cnt == 30) state = line1;
                line1 :             if (cnt == 20) state = line2;
                line2 :             if (cnt == 20) state = delay_t;
                delay_t :           if (cnt == 400) state = clear_disp;
                clear_disp :        if (cnt == 200) state = line1;
                default : state = delay;
            endcase
        end
end
```

- 시간 및 동작에 따라 제어 흐름을 효과적으로 관리할 수 있습니다.

```verilog
always @(posedge rst or posedge clk_100hz)
begin
    if (rst)
        cnt = 0;
    else
        begin
            case (state)
                delay :
                    if (cnt >= 70) cnt = 0;
                    else cnt = cnt + 1;
                function_set :
                    if (cnt >= 30) cnt = 0;
                    else cnt = cnt + 1;
                disp_onoff :
                    if (cnt >= 30) cnt = 0;
                    else cnt = cnt + 1;
                entry_mode :
                    if (cnt >= 30) cnt = 0;
                    else cnt = cnt + 1;
                line1 :
                    if (cnt >= 20) cnt = 0;
                    else cnt = cnt + 1;
                line2 :
                    if (cnt >= 20) cnt = 0;
                    else cnt = cnt + 1;
                delay_t :
                    if (cnt >= 400) cnt = 0;
                    else cnt = cnt + 1;
                clear_disp :
                    if (cnt >= 200) cnt = 0;
                    else cnt = cnt + 1;
                default : cnt = 0;
            endcase
        end
end
```

- Text LCD를 제어하기 위한 State Machine을 동작시키기 위해 클럭을 카운트하는 부분이다.
- 위의 코드 부분은 상태 기반의 유한 상태 기계(FSM)에서 각 상태에 따라 cnt 값을 관리하는 논리를 구현하고 있습니다.
- 각 상태에서 cnt를 증가시키고, 특정 임계값에 도달하면 다시 0으로 초기화한다.
- 이 코드의 목적은 각 상태에서 특정 시간동안 머무르게 하고, 그 후에 다음 상태로 전이하는 타이밍을 제어한다.

```verilog
always@(posedge rst or posedge clk_100hz)
begin
    if (rst)
        begin
            lcd_rs = 1'b1;
            lcd_rw = 1'b1;
            lcd_data = 8'b00000000;
        end
    else
        begin
            case (state)
                function_set :
                    begin
                        lcd_rs = 1'b0; lcd_rw = 1'b0; lcd_data = 8'b00111100;
                    end
                disp_onoff :
                    begin
                        lcd_rs = 1'b0; lcd_rw = 1'b0; lcd_data = 8'b00001100;
                    end
                entry_mode :
                    begin
                        lcd_rs = 1'b0;  lcd_rw = 1'b0; lcd_data = 8'b00000110;
                    end
```

- 각 스테이트 머신의 상태에서 Text LCD를 제어하기 위한 제어 코드를 전송하는 블록

```verilog
                line1 :
                    begin
                        lcd_rw = 1'b0;
                        
                        case (cnt)
                            0 : begin
                                    lcd_rs = 1'b0;  lcd_data = 8'b10000000;
                                end
                            1 : begin
                                    lcd_rs = 1'b1;  lcd_data = 8'b00100000;
                                end
                            2 : begin
                                    lcd_rs = 1'b1;  lcd_data = 8'b01001000; // H
                                end
                            3 : begin
                                    lcd_rs = 1'b1;  lcd_data = 8'b01100101; // e
                                end
                            4 : begin
                                    lcd_rs = 1'b1;  lcd_data = 8'b01101100; // l
                                end
                            5 : begin
                                    lcd_rs = 1'b1;  lcd_data = 8'b01101100; // l
                                end
                            6 : begin
                                    lcd_rs = 1'b1;  lcd_data = 8'b01101111; // o
                                end
                            default : begin
                                            lcd_rs = 1'b1; lcd_rw = 1'b0;   lcd_data = 8'b00000000;
                                      end
                        endcase
                    end
```

- 스테이트 머신 중 1 라인에 데이터를 전달하기 위한 블록

```verilog
                line2 :
                    begin
                        lcd_rw = 1'b0;

                        case (cnt)
                            0 : begin
                                    lcd_rs = 1'b0; lcd_data = 8'b11000000;
                                end
                            9 : begin
                                    lcd_rs = 1'b1; lcd_data = 8'b01010111; // W
                                end
                            10 : begin
                                    lcd_rs = 1'b1; lcd_data = 8'b01101111; // o
                                end
                            11 : begin
                                    lcd_rs = 1'b1; lcd_data = 8'b01110010; // r
                                end
                            12 : begin
                                    lcd_rs = 1'b1; lcd_data = 8'b01101100; // l
                                end
                            13 : begin
                                    lcd_rs = 1'b1; lcd_data = 8'b01100100; // d
                                end
                            default : begin
                                    lcd_rs = 1'b1; lcd_data = 8'b00100000; 
                                end
                        endcase
                    end  
```

- 스테이트 머신 중 2 라인에 데이터를 전달하기 위한 블록

```verilog
                delay_t :
                    begin
                        lcd_rs = 1'b0; lcd_rw = 1'b0; lcd_data = 8'b00000010;
                    end
                clear_disp :
                    begin
                        lcd_rs = 1'b0; lcd_rw = 1'b0; lcd_data = 8'b00000001;
                    end
                default :
                    begin
                        lcd_rs = 1'b1;  lcd_rw = 1'b1;  lcd_data = 8'b00000000;
                    end
            endcase
        end
end

assign lcd_e = clk_100hz;

endmodule
```

- 스테이트 머신 중 나머지 상태일 때 제어코드를 전달하는 블록

### Open elaborated design

Pin Package(핀 설정)

<img src="../../images/lab/week10/pin_.PNG">
<img src="../../images/lab/week10/pin.jpg">

Schema

<img src="../../images/lab/week10/schm.jpg">

### 풀 코드

```verilog
module textlcd(rst, clk, lcd_e, lcd_rs, lcd_rw, lcd_data);

input rst, clk;
output lcd_e, lcd_rs, lcd_rw;
output [7:0] lcd_data;

wire lcd_e;
reg lcd_rs, lcd_rw;
reg [7:0] lcd_data;

reg [2:0] state;
parameter delay = 3'b000,
        function_set = 3'b001,
        entry_mode = 3'b010,
        disp_onoff = 3'b011,
        line1 = 3'b100,
        line2 = 3'b101,
        delay_t = 3'b110,
        clear_disp = 3'b111;

integer cnt;
integer cnt_100hz;
reg clk_100hz;

always @(posedge rst or posedge clk)
begin
    if (rst)
        begin
        cnt_100hz = 0;  clk_100hz = 1'b0;
        end
    else if (cnt_100hz >= 4)
        begin
        cnt_100hz = 0; clk_100hz = ~clk_100hz;
        end
    else
        cnt_100hz = cnt_100hz + 1;
end

always @(posedge rst or posedge clk_100hz)
begin
    if (rst)
        cnt = 0;
    else
        begin
            case (state)
                delay :
                    if (cnt >= 70) cnt = 0;
                    else cnt = cnt + 1;
                function_set :
                    if (cnt >= 30) cnt = 0;
                    else cnt = cnt + 1;
                disp_onoff :
                    if (cnt >= 30) cnt = 0;
                    else cnt = cnt + 1;
                entry_mode :
                    if (cnt >= 30) cnt = 0;
                    else cnt = cnt + 1;
                line1 :
                    if (cnt >= 20) cnt = 0;
                    else cnt = cnt + 1;
                line2 :
                    if (cnt >= 20) cnt = 0;
                    else cnt = cnt + 1;
                delay_t :
                    if (cnt >= 400) cnt = 0;
                    else cnt = cnt + 1;
                clear_disp :
                    if (cnt >= 200) cnt = 0;
                    else cnt = cnt + 1;
                default : cnt = 0;
            endcase
        end
end

always@(posedge rst or posedge clk_100hz)
begin
    if (rst)
        state = delay;
    else
        begin
            case (state)
                delay :     if (cnt == 70) state = function_set;
                function_set :      if (cnt == 30) state = disp_onoff;
                disp_onoff :        if (cnt == 30) state = entry_mode;
                entry_mode :        if (cnt == 30) state = line1;
                line1 :             if (cnt == 20) state = line2;
                line2 :             if (cnt == 20) state = delay_t;
                delay_t :           if (cnt == 400) state = clear_disp;
                clear_disp :        if (cnt == 200) state = line1;
                default : state = delay;
            endcase
        end
end

    always@(posedge rst or posedge clk_100hz)
    begin
        if (rst)
            begin
                lcd_rs = 1'b1;
                lcd_rw = 1'b1;
                lcd_data = 8'b00000000;
            end
        else
            begin
                case (state)
                    function_set :
                        begin
                            lcd_rs = 1'b0; lcd_rw = 1'b0; lcd_data = 8'b00111100;
                        end
                    disp_onoff :
                        begin
                            lcd_rs = 1'b0; lcd_rw = 1'b0; lcd_data = 8'b00001100;
                        end
                    entry_mode :
                        begin
                            lcd_rs = 1'b0;  lcd_rw = 1'b0; lcd_data = 8'b00000110;
                        end
                    line1 :
                        begin
                            lcd_rw = 1'b0; 
                            
                            case (cnt)
                                0 : begin
                                        lcd_rs = 1'b0;  lcd_data = 8'b10000000;
                                    end
                                1 : begin
                                        lcd_rs = 1'b1;  lcd_data = 8'b00100000;
                                    end
                                2 : begin
                                        lcd_rs = 1'b1;  lcd_data = 8'b01001000; // H
                                    end
                                3 : begin
                                        lcd_rs = 1'b1;  lcd_data = 8'b01100101; // e
                                    end
                                4 : begin
                                        lcd_rs = 1'b1;  lcd_data = 8'b01101100; // l
                                    end
                                5 : begin
                                        lcd_rs = 1'b1;  lcd_data = 8'b01101100; // l
                                    end
                                6 : begin
                                        lcd_rs = 1'b1;  lcd_data = 8'b01101111; // o
                                    end
                                7 : begin
                                        lcd_rs = 1'b1;  lcd_data = 8'b00100000; // !
                                    end
                                default : begin
                                                lcd_rs = 1'b1; lcd_rw = 1'b0;   lcd_data = 8'b00100000;
                                        end
                            endcase
                        end
                    line2 :
                        begin
                            lcd_rw = 1'b0;

                            case (cnt)
                                0 : begin
                                        lcd_rs = 1'b0; lcd_data = 8'b11000000;
                                    end
                                9 : begin
                                        lcd_rs = 1'b1; lcd_data = 8'b01010111; // W
                                    end
                                10 : begin
                                        lcd_rs = 1'b1; lcd_data = 8'b01101111; // o
                                    end
                                11 : begin
                                        lcd_rs = 1'b1; lcd_data = 8'b01110010; // r
                                    end
                                12 : begin
                                        lcd_rs = 1'b1; lcd_data = 8'b01101100; // l
                                    end
                                13 : begin
                                        lcd_rs = 1'b1; lcd_data = 8'b01100100; // d
                                    end
                                default : begin
                                        lcd_rs = 1'b1; lcd_data = 8'b00100000; 
                                    end
                            endcase
                        end                        
                    delay_t :
                        begin
                            lcd_rs = 1'b0; lcd_rw = 1'b0; lcd_data = 8'b00000010;
                        end
                    clear_disp :
                        begin
                            lcd_rs = 1'b0; lcd_rw = 1'b0; lcd_data = 8'b00000001;
                        end
                    default :
                        begin
                            lcd_rs = 1'b1;  lcd_rw = 1'b1;  lcd_data = 8'b00000000;
                        end
                endcase
            end
    end

assign lcd_e = clk_100hz;

endmodule
```

## 문법

always 블록 : 특정 조건이나 이벤트가 발생할 때 코드를 실행한다.
