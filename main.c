//https://mbebenita.github.io/WasmExplorer/
/*
int sortIntArray(int vals[], int size) {
  int a = 0;

  for (int i = 0; i < size; ++i)
        {
            for (int j = i + 1; j < size; ++j)
            {
                if (vals[i] > vals[j])
                {
                    a =  vals[i];
                    vals[i] = vals[j];
                    vals[j] = a;
                }
            }
        }
        return vals[size-1];
}*/

#include <stdio.h>
#include <time.h>       // for clock_t, clock(), CLOCKS_PER_SEC

double sortIntArray(int vals[], int size) {
  int a = 0;
  clock_t begin = clock();

  for (int i = 0; i < size; ++i)
        {
            for (int j = i + 1; j < size; ++j)
            {
                if (vals[i] > vals[j])
                {
                    a =  vals[i];
                    vals[i] = vals[j];
                    vals[j] = a;
                }
            }
        }
        return vals[size-1];

     clock_t end = clock();
     return((float) (end-begin));
}



