async function streamToCanvasCoordinates(gridCoordinates, coordinateMapper) {
  const reader = gridCoordinates.getReader();
  const re = /\n| /gm;
  const width = (coordinateMapper.gridDimen.x+1)*2;

  const triangles = [];
  
  let char = 0;
  let index = 0;
  let remainder = '';
  let lastLine = new Array(width);
  let currLine = new Array(width);

  const pump = async function (chunk) {
      while (true) {
          let result = re.exec(chunk);
          if (!result) {
              remainder = chunk.substring(char);
              char = 0;
              re.lastIndex = 0;
              return;
          }
          const x = index%width;
          if (x == 0 && index > 0) {
              const tmp = lastLine;
              lastLine = currLine;
              currLine = tmp;
          }
          const xOrYValue = parseFloat(chunk.substring(char, result.index));
          currLine[x] = x%2 == 0 ? xOrYValue*coordinateMapper.sX-1 : xOrYValue*coordinateMapper.sY+1;
          if (x % 2 == 1 && x >= 3 && index > width) {
              triangles.push(lastLine[x-3], lastLine[x-2], currLine[x-3], currLine[x-2], lastLine[x-1], lastLine[x-0]);
              triangles.push(currLine[x-1], currLine[x-0], lastLine[x-1], lastLine[x-0], currLine[x-3], currLine[x-2]);
          }
          index++;
          char = re.lastIndex;
      }
  }
  console.log(performance.now(), "stream start");
  while (true) {
      const { done, value } = await reader.read();
      const chunk = remainder + (value ? textDecode(value) : "");
      await pump(chunk);
      if (done) {
          break;
      }
  }
  console.log(performance.now(), "stream end");
  return triangles;
}

function textDecode(arr) {
  let str = '';
  for (var i = 0; i < arr.byteLength; i++) {
      str += String.fromCharCode(arr[i]);
  }
  return str;
}

onmessage = function(e) {
  console.log(this.performance.now(), "s0w");
  fetch(e.data.url)
    .then(response => {
        console.log(performance.now(), "file received");
        if (response.body != null) {
          streamToCanvasCoordinates(response.body, e.data.coordinateMapper)
          .then(triangles => {console.log(this.performance.now(), "s1w"); this.postMessage({triangles: triangles})});        
        } else {
          console.log("Response was null");
        }
    });  
}

