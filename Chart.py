# urucmionie python w wersji 3.X
import subprocess
import os
import re

import json
import random
import time
from datetime import datetime
from flask import Flask, Response, render_template
#import config

# inspect .11 x 2
# .............................. date-time section
import time,datetime
from datetime import datetime
from datetime import date
from dateutil.relativedelta import relativedelta
# current date and time
timestamp     = datetime.now().strftime("%Y-%m-%d")
now = datetime.now()    
current_time  = now.strftime("%H:%M:%S")
full_date     = now.strftime("%Y-%m-%d %H:%M:%S")
call_date     = now.strftime("%Y-%m-%d")
call_date2    = now.strftime("%d-%m-%Y")
#....................................................................
hostIP        = "192.168.25.12"                                    
hostPORT      = 5555   # komentarz z .11
formName      = 'index_wykres128.html'                             
my_list       = ['ping from ', ' server : ', '8.8.8.8']      
opions_me     = ["Meter", "Kilometer", "Millimeter"]


application = Flask(__name__)
random.seed()                 # Initialize the random number generator

def ping_testLinux(ip):
    # ping it
    args=['/bin/ping', '-c', '1', '-W', '1', str(ip)]
    #os.system("ping -n 1 172.16.16.33")
    #quit()
    p_ping = subprocess.Popen(args,
                              shell=False,
                              stdout=subprocess.PIPE)
      
    # save ping stdout
    p_ping_out = str(p_ping.communicate()[0])
    
    if (p_ping.wait() == 0):
      # rtt min/avg/max/mdev = 22.293/22.293/22.293/0.000 ms
      search = re.search(r'rtt min/avg/max/mdev = (.*)/(.*)/(.*)/(.*) ms',
                         p_ping_out, re.M|re.I)
      ping_rtt = search.group(2) 
      return(ping_rtt )


def ping_testWindows(ip):    
    # ping it
    # .windows
    args=["ping","-n","1",ip]
    # linux
    args2 = ['ping', '1', '-W', '1', ip]   # args = ['ping', '1', '-W', '1', str(ip)]
    
    p_ping = subprocess.Popen(args,shell=False,stdout=subprocess.PIPE)
    print("p_ping....")
    print(p_ping)
                            
    # save ping stdout
    p_ping_out = str(p_ping.communicate()[0])
    print("p_ping_out....")
    print(p_ping_out)
    
    """
    ==============================
     b'\r\nPinging 172.16.16.33 with 32 bytes of data:\r\nReply from 172.16.16.33: bytes=32 time=19ms TTL=63\r\n\r\nPing statistics for 172.16.16.33:\r\n    
     Packets: Sent = 1, Received = 1, Lost = 0 (0% loss),\r\nApproximate round trip times in milli-seconds:\r\n    Minimum = 19ms, Maximum = 19ms, Average = 19ms\r\n'
     =============================
    """
    start_point = p_ping_out.find("Average =")
    check_point = p_ping_out[start_point:start_point+30]
    end_ms      = check_point.find("ms")
    end_eq      = check_point.find("=")
    ping_rtt    = int(check_point[end_eq+1:end_ms ].strip())
    strPing     = str(ping_rtt)
    print("strPing............")
    print(strPing)     
    return(strPing)



@application.route('/')
def index():
    
    return render_template(formName , mylist=my_list , options=opions_me , preselect= 1 , to_select = "choose_2",utc_dt=now.strftime("%Y-%m-%d %H:%M:%S"))  #,_stringPath=now.strftime("%Y-%m-%d %H:%M:%S"), my_list=my_list_is)

# ........................................ generator danych random.random() * 100}
@application.route('/sourceData')
def chart_data():
    def GeneratorDanych():
        while True:
            json_data = json.dumps(
                {'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'value': random.random() * 100})
            yield f"data:{json_data}\n\n"
            time.sleep(1)

    return Response(GeneratorDanych() , mimetype='text/event-stream')

# ........................................... odpowiedzi icmp serwerow ping_testLinux '172.16.16.xxx'
@application.route('/sourceData-ICMP127')
def chart_data127():
    formName    = 'index_wykres127.html'
    my_list     = ['RE FROM ', ' server : ', '172.16.16.127']
    def GeneratorDanych127():
        wsk=0
        while True:
            json_data = json.dumps(
                {'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'value': ping_testLinux('172.16.16.127')})
            yield f"data:{json_data}\n\n"
            time.sleep(1)
            wsk = wsk + 1
    return Response(GeneratorDanych127() , mimetype='text/event-stream')

@application.route('/sourceData-ICMP128')
def chart_data128():
    def GeneratorDanych128():
        wsk=0
        while True:
            json_data = json.dumps(
                {'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'value': ping_testWindows('8.8.8.8')}) 
            yield f"data:{json_data}\n\n"
            print(json_data)
            time.sleep(1)
            wsk = wsk + 1
    return Response(GeneratorDanych128() , mimetype='text/event-stream')

@application.route('/sourceData-ICMP129')
def chart_data129():
    def GeneratorDanych129():
        wsk=0
        while True:
            json_data = json.dumps(
                {'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'value': ping_testLinux('172.16.16.128')})
            yield f"data:{json_data}\n\n"
            time.sleep(1)
            wsk = wsk + 1
    return Response(GeneratorDanych129() , mimetype='text/event-stream')
    
if __name__ == '__main__':
    
    #ping_testWindows('8.8.8.8')
    
    application.run(host=hostIP, port=hostPORT, debug=True, threaded=True)
    
    # nohup /usr/bin/python3 /home/zabbix/flask_app/_myFlask/wykres.py &
    # nohup /usr/bin/python3 /home/zabbix/flask_app/FileService/chart_.py &
