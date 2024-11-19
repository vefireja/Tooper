import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { supabase } from '~/lib/supabase';

export default function InputSelect({ handleOnValueChange }: { handleOnValueChange: any }) {
  const [error, setError] = useState([])
  const [jurusan, setJurusan] = useState([])
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  useEffect(() => {
    async function fetchJurusan() {
      const { data, error }: { data: any, error: any } = await supabase.from("programs").select('*')
      if (error) {
        console.log(error);

        setError(error)
        return
      }
      setJurusan(data || [])
    }
    fetchJurusan()
  }, [])


  return (
    <Select onValueChange={(e) => {
      handleOnValueChange(e?.value);;
    }}>
      <SelectTrigger className='w-full'>
        <SelectValue
          className='text-foreground text-sm native:text-lg'
          placeholder='Pilih jurusan'
        />
      </SelectTrigger>
      <SelectContent insets={contentInsets} className='w-[350px]'>
        <SelectGroup>
          <SelectLabel>Jurusan</SelectLabel>
          {
            jurusan.map((item: any, index) => (
              <SelectItem key={index} label={item.program_name} value={item.id}>
                {item.program_name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}