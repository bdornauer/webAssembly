float myFunc(float x){
  return x*x+3*x+4;
}

float areaCalc(float a, float b, int n) {
  float area = 0;
  float delta = (b-a)/((float) n);

  for(int i=0; i<n; i++){
    area += delta*myFunc(a+delta*i);
  }
  return area;
}




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
}
