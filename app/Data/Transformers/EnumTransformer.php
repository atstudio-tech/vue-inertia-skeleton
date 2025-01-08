<?php

namespace App\Data\Transformers;

use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Support\Transformation\TransformationContext;
use Spatie\LaravelData\Transformers\Transformer;

class EnumTransformer implements Transformer
{
    public function transform(DataProperty $property, mixed $value, TransformationContext $context): mixed
    {
        if (!method_exists($value, 'label')) {
            return $value->value;
        }

        return [
            'label' => $value->label(),
            'value' => $value->value,
        ];
    }
}
