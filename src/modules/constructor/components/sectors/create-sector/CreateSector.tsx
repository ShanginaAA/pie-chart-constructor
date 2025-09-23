import { Button, Grid } from '@mui/material';
import ColorPicker from 'components/Picker/ColorPicker';
import CTextFields from 'modules/common/TextFields/CTextFields';
import { FC } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

const formSchema = z.object({
  // sector_id:
  name: z
    .string()
    .min(1, 'Название не должно быть пустым.')
    .max(25, 'Название не должно превышать более 25 символов.'),
  percentages: z.number().gte(1, 'Минимальное значение 1.').lte(100, 'Максимальное значение 100.'),
  // color: z.string().nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

const CreateSector: FC = () => {
  const formOptions = {
    resolver: zodResolver(formSchema),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>(formOptions);

  const onSubmit: SubmitHandler<any> = async (data: FormSchema) => {
    try {
      console.log('data');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // handle inputs
        console.log(data);
      })}
    >
      <Grid display={'flex'} flexDirection={'column'} gap={2}>
        <CTextFields
          {...register('name')}
          label="Наименование"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <CTextFields
          {...register('percentages', { setValueAs: (v) => Number(v) })}
          label="Значение"
          error={!!errors.percentages}
          helperText={errors.percentages?.message}
        />
        <ColorPicker />

        <Button
          type={'submit'}
          variant="contained"
          sx={{
            height: '60px',
            textTransform: 'none',
            fontWeight: '400',
            fontSize: '16px',
            borderRadius: '10px',
          }}
        >
          Добавить сектор
        </Button>
      </Grid>
    </form>
  );
};

export default CreateSector;
