async function streamToCanvasCoordinates(gridCoordinates, coordinateMapper) {
  const reader = gridCoordinates.getReader();
  const re = /\n| /gm;
  const width = (coordinateMapper.gridDimen.x+1)*2;

  const triangles = new Float32Array(coordinateMapper.cells*12);
  
  let char = 0;
  let index = 0;
  let triangleIndex = 0;
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
              triangles[triangleIndex*12+00] = lastLine[x-3];
              triangles[triangleIndex*12+01] = lastLine[x-2];
              triangles[triangleIndex*12+02] = currLine[x-3];
              triangles[triangleIndex*12+03] = currLine[x-2];
              triangles[triangleIndex*12+04] = lastLine[x-1];
              triangles[triangleIndex*12+05] = lastLine[x-0];
              triangles[triangleIndex*12+06] = currLine[x-1];
              triangles[triangleIndex*12+07] = currLine[x-0];
              triangles[triangleIndex*12+08] = lastLine[x-1];
              triangles[triangleIndex*12+09] = lastLine[x-0];
              triangles[triangleIndex*12+10] = currLine[x-3];
              triangles[triangleIndex*12+11] = currLine[x-2];
              triangleIndex++;
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
  fetch(e.data.url)
    .then(response => {
        console.log(performance.now(), "file received");
        if (response.body != null) {
          streamToCanvasCoordinates(response.body, e.data.coordinateMapper)
          .then(triangles => this.postMessage(triangles, [triangles.buffer]));        
        } else {
          console.log("Response was null");
        }
    });  
}

